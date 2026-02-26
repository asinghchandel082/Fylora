import fs from "fs";
import { PDFDocument } from "@cantoo/pdf-lib";
import { compress } from "@quicktoolsone/pdf-compress";
import * as pdfjsLib from "pdfjs-dist";

async function main() {
  try {
    console.log("Creating test PDF...");
    const doc = await PDFDocument.create();
    const page = doc.addPage([500, 500]);
    page.drawText("This should compress", { x: 50, y: 100, size: 24 });
    const bytes = await doc.save();
    
    console.log("Compressing test PDF...");
    try {
        const compressed = await compress(bytes, { preset: "high" });
        fs.writeFileSync("test-compressed.pdf", new Uint8Array(compressed.pdf));
        console.log("Compression success.", compressed.pdf.byteLength);
    } catch (err) {
        console.log("Compression failed:", err);
    }

    console.log("Encrypting test PDF...");
    const lockedBytes = await doc.save({ userPassword: "test", ownerPassword: "test" });
    fs.writeFileSync("test-locked.pdf", lockedBytes);

    console.log("Parsing test PDF via PDF.js to unlock...");
    try {
        const loadingTask = pdfjsLib.getDocument({
            data: lockedBytes,
            password: "test" // pass the password to fully decrypt in memory
        });
        const pdfJS = await loadingTask.promise;
        console.log("PDF.js unlocked it! Pages:", pdfJS.numPages);
        
        // Can we save exactly what pdfjs parsed? Not directly. 
        // We'll rely on cantoo/pdf-lib.
        const lockedDoc = await PDFDocument.load(lockedBytes, { password: "test" });
        const newDoc = await PDFDocument.create();
        const pages = await newDoc.copyPages(lockedDoc, lockedDoc.getPageIndices());
        pages.forEach(p => newDoc.addPage(p));
        const finalUnsecured = await newDoc.save();
        
        console.log("Resaved size:", finalUnsecured.byteLength);

    } catch (err) {
        console.log("PDF.js unlocking failed:", err.message);
    }

  } catch (err) {
    console.error("Fatal Error:", err);
  }
}

main();
