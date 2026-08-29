// server.js

const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const employeeRoutes = require('./routes/employeeRoutes');

dotenv.config();
connectDB();

const app = express();

// Middleware: allows Express to read JSON data sent in request bodies
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Employee Management System API is running...');
});

// Any request to /api/employees/* is handled by employeeRoutes
app.use('/api/employees', employeeRoutes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});