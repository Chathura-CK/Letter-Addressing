const mongoose = require('mongoose');

const LetterSchema = new mongoose.Schema({
  filename: String,
  uploadDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Letter', LetterSchema);