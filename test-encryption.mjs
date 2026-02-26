import fs from "fs";
import { PDFDocument } from "pdf-lib";
import { encryptPDF } from "@pdfsmaller/pdf-encrypt-lite";

async function main() {
  try {
    // Create a simple PDF
    const doc = await PDFDocument.create();
    const page = doc.addPage([200, 200]);
    page.drawText("Secret Document", { x: 50, y: 100 });
    const pdfBytes = await doc.save();
    
    fs.writeFileSync("original.pdf", pdfBytes);
    
    // Encrypt
    const password = "mysecretpassword";
    const encryptedBytes = await encryptPDF(new Uint8Array(pdfBytes), password);
    fs.writeFileSync("encrypted.pdf", encryptedBytes);
    console.log("Encrypted created");

    // Unlock
    // To unlock, we load with password, then copy to new doc to strip encryption
    const lockedDoc = await PDFDocument.load(new Uint8Array(encryptedBytes), { password });
    
    // Test if saving directly keeps encryption
    // const testSaveBytes = await lockedDoc.save();
    // fs.writeFileSync("unlocked_test.pdf", testSaveBytes);
    
    const newDoc = await PDFDocument.create();
    const indices = lockedDoc.getPageIndices();
    const pages = await newDoc.copyPages(lockedDoc, indices);
    pages.forEach(p => newDoc.addPage(p));
    
    const unlockedBytes = await newDoc.save();
    fs.writeFileSync("unlocked.pdf", unlockedBytes);
    console.log("Unlocked created");
    
  } catch (err) {
    console.error("Error:", err);
  }
}

main();
