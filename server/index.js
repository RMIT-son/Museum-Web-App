// server/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./services/mongoose');

const app = express();
const PORT = process.env.PORT || 5000;
const URI = process.env.MONGODB_URI;

app.use(cors());
app.use(express.json());

connectDB(URI).then(r => {});



