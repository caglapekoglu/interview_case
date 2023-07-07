const express = require('express');
const bodyParser = require("body-parser");
const db = require("./config/db");
const app = express();
const port = 8880; // İstediğiniz bir port numarası seçebilirsiniz
const questionRoutes = require('./routes/questionSet');
const interviewRoutes = require('./routes/interview');
const ansverRoutes = require('./routes/answer');

const cors = require('cors');
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use('/questions', questionRoutes);
app.use('/interview', interviewRoutes);
app.use('/answer', ansverRoutes);

// Uygulamayı belirtilen portta dinlemeye başlama
app.listen(port, () => {
  console.log(`Sunucu http://localhost:${port} adresinde çalışıyor!`);
});

