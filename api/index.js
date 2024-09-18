import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import { mongodbConnection } from './config/db.js';
import cors from 'cors';
import { fileURLToPath } from 'url';

// Import routes
import userRoutes from './routes/userRoute.js';
// import listingRoutes from './routes/listingRoutes.js';


// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 4000;

dotenv.config();

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// DB connection
mongodbConnection();

// Routes
app.use('/api/users', userRoutes);
// app.use('/api/listing', listingRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});