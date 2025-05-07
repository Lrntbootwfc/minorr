
const express = require("express")
const cors = require('cors');
const pricingRoutes = require('./routes/pricingRoutes');
const authRoutes = require('./routes/authRoutes'); // Authentication routes
const connectDB = require('./config/db');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
connectDB();

// Use CORS middleware
app.use(cors());

// Parse incoming requests with JSON payloads
app.use(express.json());

// Routes for pricing
app.use("/api", pricingRoutes);

// Routes for authentication (login/signup)
app.use("/api/auth", authRoutes);  // Link auth routes here

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});





// import dotenv from 'dotenv';
// import express from 'express';
// import cors from 'cors';
// import pricingRoutes from './routes/pricingRoutes.js';
// import authRoutes from './routes/authRoutes.js';  // Import authentication routes
// import { connectDB } from './config/db.js';
// dotenv.config();
// const app = express();
// connectDB();
// const cors = require('cors');
// app.use(cors());
// app.use(express.json());

// // Routes for pricing
// app.use("/api", pricingRoutes);

// // Routes for authentication (login/signup)
// app.use("/api/auth", authRoutes);  // Link auth routes here

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(Server running on port ${PORT});
// });