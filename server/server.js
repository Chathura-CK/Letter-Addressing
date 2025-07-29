// server.js
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const letterRoutes = require('./routes/letter');

const app = express();
const PORT = 5000;

app.use(cors(
  {
  origin: 'https://wonderful-coast-0426eb800.1.azurestaticapps.net'
})
);
app.use(express.json());
app.use(fileUpload()); // Important for file uploads

// Route for /api/letter/*
app.use('/api/letter', letterRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
