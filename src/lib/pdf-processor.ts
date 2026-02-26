import { PDFDocument, degrees, rgb, StandardFonts } from "@cantoo/pdf-lib";
import JSZip from "jszip";
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.mjs?url";
import Tesseract from "tesseract.js";
import { encryptPDF } from "@pdfsmaller/pdf-encrypt-lite";

// Set worker source for pdfjs locally using Vite
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

function toBlob(data: Uint8Array, type = "application/pdf"): Blob {
  return new Blob([new Uint8Array(data)], { type });
}

export async function processPdf(
  toolId: string,
  files: File[],
  options: { password?: string; watermarkText?: string; rotationAngle?: number; compressLevel?: string; searchText?: string; annotationType?: string; } = {}
): Promise<Blob> {
  const readFile = (file: File) => file.arrayBuffer();

  switch (toolId) {
    case "merge": {
      const merged = await PDFDocument.create();
      for (const file of files) {
        const bytes = await readFile(file);
        const doc = await PDFDocument.load(bytes);
        const pages = await merged.copyPages(doc, doc.getPageIndices());
        pages.forEach(p => merged.addPage(p));
      }
      return toBlob(await merged.save());
    }

    case "split": {
      const bytes = await readFile(files[0]);
      const doc = await PDFDocument.load(bytes);
      const zip = new JSZip();
      const pageCount = doc.getPageCount();
      for (let i = 0; i < pageCount; i++) {
        const newDoc = await PDFDocument.create();
        const [page] = await newDoc.copyPages(doc, [i]);
        newDoc.addPage(page);
        const pdfBytes = await newDoc.save();
        zip.file(`page_${i + 1}.pdf`, pdfBytes);
      }
      return await zip.generateAsync({ type: "blob" });
    }

    case "rotate": {
      const bytes = await readFile(files[0]);
      const doc = await PDFDocument.load(bytes);
      const angle = options.rotationAngle || 90;
      doc.getPages().forEach(page => page.setRotation(degrees(page.getRotation().angle + angle)));
      return toBlob(await doc.save());
    }

    case "compress": {
      const bytes = await readFile(files[0]);
      try {
        const level = options.compressLevel || "balanced";

        // Dynamically assign DPI scale and JPEG quality based on user request
        let scale = 1.5;
        let quality = 0.5;
        if (level === "low") { scale = 2.0; quality = 0.8; }
        else if (level === "balanced") { scale = 1.5; quality = 0.5; }
        else if (level === "high") { scale = 1.0; quality = 0.3; }

        // Clone the bytes using slice(0) because pdf.js transfers the ArrayBuffer to its Web Worker, detaching it!
        const pdf = await pdfjsLib.getDocument({ data: bytes.slice(0) }).promise;
        const newDoc = await PDFDocument.create();

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale });
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          if (!context) continue;

          canvas.height = viewport.height;
          canvas.width = viewport.width;

          await page.render({ canvasContext: context, viewport, canvas: canvas as any }).promise;

          // Drastically crush the page into a lower fidelity JPEG payload
          const dataUrl = canvas.toDataURL("image/jpeg", quality);
          // Convert DataURL to Uint8Array efficiently
          const imgStr = atob(dataUrl.split(',')[1]);
          const imgBytes = new Uint8Array(imgStr.length);
          for (let i = 0; i < imgStr.length; i++) {
            imgBytes[i] = imgStr.charCodeAt(i);
          }

          const img = await newDoc.embedJpg(imgBytes);
          const newPage = newDoc.addPage([img.width, img.height]);
          newPage.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
        }

        const compressedBytes = await newDoc.save({ useObjectStreams: true });

        // Safety clause: if rasterization somehow inflated it, fallback to silent deflation
        if (compressedBytes.byteLength < bytes.byteLength) {
          return toBlob(compressedBytes);
        } else {
          console.log("Canvas Raster inflated PDF. Triggering silent deflation strategy instead.");
          const doc = await PDFDocument.load(bytes, { updateMetadata: false });
          return toBlob(await doc.save({ useObjectStreams: true }));
        }

      } catch (err) {
        // Fallback to purely pdf-lib deflation if canvas crashes or rasterizer fails
        console.warn("Advanced Compression Failure. Triggering Basic Deflation.", err);
        const doc = await PDFDocument.load(bytes, { updateMetadata: false });
        return toBlob(await doc.save({ useObjectStreams: true }));
      }
    }

    case "watermark": {
      const bytes = await readFile(files[0]);
      const doc = await PDFDocument.load(bytes);
      const font = await doc.embedFont(StandardFonts.HelveticaBold);
      const text = options.watermarkText || "FYLORA";

      for (const page of doc.getPages()) {
        const { width, height } = page.getSize();
        page.drawText(text, {
          x: width / 2 - (text.length * 15),
          y: height / 2,
          size: 50,
          font,
          color: rgb(0.75, 0.75, 0.75),
          opacity: 0.3,
          rotate: degrees(45),
        });
      }
      return toBlob(await doc.save());
    }

    case "reorder": {
      const bytes = await readFile(files[0]);
      const doc = await PDFDocument.load(bytes);
      const newDoc = await PDFDocument.create();
      const indices = doc.getPageIndices().reverse();
      const pages = await newDoc.copyPages(doc, indices);
      pages.forEach(p => newDoc.addPage(p));
      return toBlob(await newDoc.save());
    }

    case "protect": {
      const bytes = new Uint8Array(await readFile(files[0]));
      if (!options.password) throw new Error("Password is required to protect the PDF.");
      // Real RC4 128-bit encryption client-side
      const encrypted = await encryptPDF(bytes, options.password);
      return toBlob(encrypted);
    }

    case "unlock": {
      const bytes = await readFile(files[0]);

      if (!options.password) {
        throw new Error("Password is required to unlock the PDF.");
      }

      try {
        // 1. Load the encrypted document using the user's password
        const lockedDoc = await PDFDocument.load(bytes, {
          password: options.password,
          ignoreEncryption: false
        });

        // 2. To truly "unlock" a PDF, we must save it without the password properties.
        // But since we provided the password, we can just save it. By default, `@cantoo/pdf-lib` 
        // will preserve encryption IF we preserve the original document. We must "create" a new one!
        const newDoc = await PDFDocument.create();
        const pages = await newDoc.copyPages(lockedDoc, lockedDoc.getPageIndices());
        pages.forEach(p => newDoc.addPage(p));

        return toBlob(await newDoc.save());
      } catch (err: any) {
        if (err?.message?.includes("password")) {
          throw new Error("Incorrect Password.");
        }
        console.error("Unlock Error Breakdown:", err);
        // Fallback: the PDF might NOT be encrypted, or was already unlocked.
        try {
          const doc = await PDFDocument.load(bytes);
          return toBlob(await doc.save());
        } catch {
          throw new Error(`Could not unlock this PDF. Reason: ${err?.message || "Corrupted Structure"}`);
        }
      }
    }

    case "pdf-to-txt": {
      const bytes = await readFile(files[0]);
      const pdf = await pdfjsLib.getDocument({ data: bytes }).promise;
      let text = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items.map((item: { str?: string } | unknown) => (item as { str: string }).str).join(" ");
        text += `--- Page ${i} ---\n${pageText}\n\n`;
      }
      return new Blob([text], { type: "text/plain" });
    }

    case "pdf-to-md": {
      const bytes = await readFile(files[0]);
      const pdf = await pdfjsLib.getDocument({ data: bytes }).promise;
      let md = `# Extracted Markdown (${files[0].name})\n\n`;
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items.map((item: { str?: string } | unknown) => (item as { str: string }).str).join(" ");
        md += `## Page ${i}\n${pageText}\n\n`;
      }
      return new Blob([md], { type: "text/markdown" });
    }

    case "image-to-pdf": {
      const newDoc = await PDFDocument.create();
      for (const file of files) {
        const bytes = await readFile(file);
        const img = file.type === "image/png"
          ? await newDoc.embedPng(bytes)
          : await newDoc.embedJpg(bytes);
        const page = newDoc.addPage([img.width, img.height]);
        page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
      }
      return toBlob(await newDoc.save());
    }

    case "pdf-to-image": {
      const bytes = await readFile(files[0]);
      const pdf = await pdfjsLib.getDocument({ data: bytes }).promise;
      const zip = new JSZip();

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2.0 });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        if (!context) continue;

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({ canvasContext: context, viewport, canvas: canvas as any }).promise;

        const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, "image/png"));
        if (blob) {
          zip.file(`page_${i}.png`, blob);
        }
      }

      return await zip.generateAsync({ type: "blob" });
    }

    case "ocr": {
      const bytes = await readFile(files[0]);
      const pdf = await pdfjsLib.getDocument({ data: bytes }).promise;

      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 2.0 });
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      if (!context) throw new Error("Could not create canvas context for OCR.");

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      await page.render({ canvasContext: context, viewport, canvas: canvas as any }).promise;
      const dataUrl = canvas.toDataURL("image/png");

      const result = await Tesseract.recognize(dataUrl, "eng", {
        logger: m => console.log(m)
      });

      return new Blob([result.data.text], { type: "text/plain" });
    }

    case "annotate": {
      const bytes = await readFile(files[0]);
      const doc = await PDFDocument.load(bytes);
      const pages = doc.getPages();

      // We use pdfjs to extract bounding boxes of text accurately
      const pdf = await pdfjsLib.getDocument({ data: bytes }).promise;
      const searchText = options.searchText?.toLowerCase() || "";

      if (!searchText) throw new Error("Please provide text to annotate.");

      let found = false;

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pdfLibPage = pages[i - 1];

        for (const item of content.items as any[]) {
          if (item.str && item.str.toLowerCase().includes(searchText)) {
            found = true;

            // `item.transform` is [scaleX, skewY, skewX, scaleY, tx, ty]
            // We need to properly scale it to the pdf-lib page dimensions
            const pageHeight = pdfLibPage.getHeight();

            // Note: Canvas coordinates are top-down. PDF scale is bottom-up. But `tx`/`ty` from PDFJS TextContent are already in PDF coordinates!
            const tx = item.transform[4];
            const ty = item.transform[5];

            // The font size is roughly the height of the bounding box
            const fontSize = Math.abs(item.height || item.transform[3] || 12);
            // the width of the matched text chunk
            const textWidth = item.width || (item.str.length * (fontSize * 0.5));

            if (options.annotationType === "highlight") {
              pdfLibPage.drawRectangle({
                x: tx,
                y: ty - (fontSize * 0.2), // Move down slightly to cover descenders
                width: textWidth,
                height: fontSize * 1.2, // Pad height slightly
                color: rgb(1, 0.8, 0), // Golden Yellow
                opacity: 0.4,
              });
            } else if (options.annotationType === "underline") {
              pdfLibPage.drawLine({
                start: { x: tx, y: ty - 2 },
                end: { x: tx + textWidth, y: ty - 2 },
                thickness: Math.max(1, fontSize * 0.1),
                color: rgb(0.8, 0, 0), // Deep Red
              });
            } else if (options.annotationType === "comment") {
              const commentBoxHeight = Math.max(14, fontSize * 1.5);
              pdfLibPage.drawRectangle({
                x: tx + textWidth + 8,
                y: ty - (commentBoxHeight * 0.2),
                width: 70, // fixed width for comment badge
                height: commentBoxHeight,
                color: rgb(1, 0.9, 0.9), // Light red bg
                opacity: 1,
              });
              pdfLibPage.drawText("Annotated", {
                x: tx + textWidth + 12,
                y: ty,
                size: fontSize * 0.8,
                color: rgb(0.8, 0, 0),
              });
            }
          }
        }
      }

      if (!found) throw new Error(`Could not find the text "${options.searchText}" anywhere in the document.`);

      return toBlob(await doc.save());
    }

    case "redact": {
      const bytes = await readFile(files[0]);
      const doc = await PDFDocument.load(bytes);
      const pages = doc.getPages();
      if (pages.length > 0) {
        const firstPage = pages[0];
        const { height } = firstPage.getSize();

        // Simple redaction rectangle for the MVP
        firstPage.drawRectangle({
          x: 50,
          y: height - 150,
          width: 250,
          height: 40,
          color: rgb(0, 0, 0), // Solid black
        });
      }
      return toBlob(await doc.save());
    }

    default:
      throw new Error(`Tool "${toolId}" is not yet implemented client-side.`);
  }
}
