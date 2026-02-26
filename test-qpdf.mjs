import fs from "fs";
import { PDFDocument } from "@cantoo/pdf-lib";
import qpdf from "@neslinesli93/qpdf-wasm";

async function main() {
    try {
        console.log("Generating simple PDF...");
        const doc = await PDFDocument.create();
        const page = doc.addPage([300, 300]);
        page.drawText("This should be locked and compressed by qpdf!", { x: 50, y: 150 });
        const originalBytes = await doc.save();
        fs.writeFileSync("qpdf_input.pdf", originalBytes);

        console.log("QPDF: Initializing...");
        
        // Use qpdf-wasm to encrypt it
        const result = await qpdf({
            command: "qpdf --encrypt test test 256 -- qpdf_input.pdf qpdf_output.pdf",
            inputFiles: [{ name: "qpdf_input.pdf", data: originalBytes }]
        });

        console.log("Result type:", typeof result);
        console.log("Result keys:", Object.keys(result));
        console.log("Result obj:", result);

        if (Array.isArray(result) && result[0]) {
             fs.writeFileSync("qpdf_final_encrypted.pdf", result[0].data);
             console.log("QPDF WASM Encryption completed successfully!");
        }

    } catch (e) {
        console.error("Test failed:", e);
    }
}

main();
