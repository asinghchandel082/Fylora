import fs from "fs";
import { PDFDocument } from "@cantoo/pdf-lib";

async function main() {
  try {
    // 1. Create and Encrypt
    const doc = await PDFDocument.create();
    const page = doc.addPage([200, 200]);
    page.drawText("Secret Cantoo Document", { x: 50, y: 100 });
    
    // Save with password using Cantoo
    const pdfBytes = await doc.save({ userPassword: "password123", ownerPassword: "password123" });
    fs.writeFileSync("cantoo-encrypted.pdf", pdfBytes);
    console.log("Encrypted using Cantoo");

    // 2. Unlock
    const lockedDoc = await PDFDocument.load(new Uint8Array(pdfBytes), { password: "password123" });
    const unlockedBytes = await lockedDoc.save();
    fs.writeFileSync("cantoo-unlocked.pdf", unlockedBytes);
    console.log("Unlocked using Cantoo");

  } catch (err) {
    console.error("Error:", err);
  }
}

main();
