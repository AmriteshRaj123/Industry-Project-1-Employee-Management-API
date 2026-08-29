// server.js

const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config(); // Load variables from .env into process.env

connectDB(); // Connect to MongoDB

const app = express();

app.get('/', (req, res) => {
  res.send('Employee Management System API is running...');
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});