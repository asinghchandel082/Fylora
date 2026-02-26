import fs from "fs";
import { PDFDocument } from "pdf-lib-with-encrypt";

async function main() {
    try {
        console.log("Generating simple PDF...");
        const doc = await PDFDocument.create();
        const page = doc.addPage([300, 300]);
        page.drawText("This should be locked!", { x: 50, y: 150 });
        
        const bytes = await doc.save({
            password: "test" // this library specifies 'password'
        });
        
        fs.writeFileSync("output_locked2.pdf", bytes);
        console.log("Saved. Testing if locked...");

        const isEncrypted = await PDFDocument.load(bytes)
            .then(() => false)
            .catch((e) => e.message.includes("encrypted") || e.message.includes("password"));
            
        console.log("Is it actually locked/encrypted according to pdf-lib parser?", isEncrypted);

        // Can it unlock?
        try {
            const unlockedDoc = await PDFDocument.load(bytes, { password: 'test' });
            console.log("Successfully loaded using password.");
        } catch (err) {
            console.log("Failed to unlock with password", err.message);
        }

    } catch (e) {
        console.error("Test failed:", e);
    }
}

main();
