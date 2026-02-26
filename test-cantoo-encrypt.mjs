import fs from "fs";
import { PDFDocument } from "@cantoo/pdf-lib";

async function main() {
    try {
        console.log("Generating simple PDF...");
        const doc = await PDFDocument.create();
        const page = doc.addPage([300, 300]);
        page.drawText("This should be locked!", { x: 50, y: 150 });
        
        const bytes = await doc.save({
            userPassword: "test",
            ownerPassword: "test"
            // the cantoo repo says standard encryption requires no other parameters.
        });
        
        fs.writeFileSync("output_locked.pdf", bytes);
        console.log("Saved. Testing if locked...");

        const isEncrypted = await PDFDocument.load(bytes)
            .then(() => false)
            .catch((e) => e.message.includes("encrypted") || e.message.includes("password"));
            
        console.log("Is it actually locked/encrypted according to cantoo/pdf-lib parser?", isEncrypted);
    } catch (e) {
        console.error("Test failed:", e);
    }
}

main();
