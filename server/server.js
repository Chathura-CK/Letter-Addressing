// server.js
 const express = require('express');
 const cors = require('cors');
 const mongoose = require('mongoose');
 require('dotenv').config();

const fileUpload = require('express-fileupload');
const letterRoutes = require('./routes/letter');


// app.use(cors(
//   {
//   origin: 'https://wonderful-coast-0426eb800.1.azurestaticapps.net',
//   methods: ['GET', 'POST'],
// })
// );

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Import routes

app.use('/api/letter', letterRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));