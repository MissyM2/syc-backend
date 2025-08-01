import 'dotenv/config.js';
import connectDB from './config/db.js';
import express from 'express';
//import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import multer from 'multer'; // t receive multi-part form data
const upload = multer();
import closetRoutes from './routes/closetRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

const app = express();

connectDB();

// body parser
app.use(express.json()); // Middleware to parse JSON body
app.use(express.urlencoded({ extended: true }));
// CORS
app.use(cors({ origin: '*' }));

// Multer
//app.use(upload.any());

// API routes
app.use('/api/users', userRoutes);
app.use('/api/closet', closetRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Image Upload and Retrieval Service is running!');
});

// Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
