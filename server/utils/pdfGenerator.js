const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
const fs = require('fs');

async function generateLetters(addresses, templatePath) {
  const templateBytes = fs.readFileSync(templatePath);
  const pdfs = [];

  for (const addr of addresses) {
    const doc = await PDFDocument.load(templateBytes);
    const font = await doc.embedFont(StandardFonts.Helvetica);

    const pages = doc.getPages();
    const frontPage = pages[0];

    // Optionally add letter content to front page
    // frontPage.drawText(`To:\n${addr.name}\n${addr.street}\n${addr.city}`, {
    //   x: 50,
    //   y: 500,
    //   size: 12,
    //   font,
    //   color: rgb(0, 0, 0),
    //   lineHeight: 14,
    // });

    // Create a new back page for the address
    const backPage = doc.addPage([frontPage.getWidth(), frontPage.getHeight()]);

    // Typical envelope window position (adjust for your printer/envelope layout)
    backPage.drawText(`To:\n${addr.name}\n${addr.street}\n${addr.city}`, {
      x: backPage.getWidth() - 150,
      y: backPage.getHeight() - 150, // upper third
      size: 14,
      font,
      color: rgb(0, 0, 0),
      lineHeight: 18,
    });

    const pdfBytes = await doc.save();
    const buffer = Buffer.from(pdfBytes);
    pdfs.push({ name: `${addr.name.replace(/\s+/g, '_')}.pdf`, buffer });
  }

  return pdfs;
}

module.exports = generateLetters;
