const express = require('express');
const router = express.Router();
const fs = require('fs');
const archiver = require('archiver');
const generateLetters = require('../utils/pdfGenerator');

const path = require('path');

router.post('/upload', (req, res) => {
  if (!req.files || !req.files.letter) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const letterFile = req.files.letter;
  const uploadPath = path.join(__dirname, '..', 'uploads', letterFile.name);

  // Ensure uploads directory exists
  if (!fs.existsSync(path.dirname(uploadPath))) {
    fs.mkdirSync(path.dirname(uploadPath), { recursive: true });
  }

  letterFile.mv(uploadPath, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ filePath: uploadPath });
  });
});


router.post('/generate', async (req, res) => {
  const { addresses, templatePath } = req.body;

  if (!fs.existsSync(templatePath)) {
    return res.status(400).json({ error: 'Template not found' });
  }

  try {
    const letters = await generateLetters(addresses, templatePath);
    res.attachment('letters.zip');

    const archive = archiver('zip');
    archive.pipe(res);

    for (const letter of letters) {
      archive.append(letter.buffer, { name: letter.name });
    }

    archive.finalize();
  } catch (err) {
    console.error(err);
    res.status(500).send('Error generating letters');
  }
});

module.exports = router;
