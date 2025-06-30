import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import closetitemRoutes from './routes/closetitemRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

const app = express();

import 'dotenv/config.js';

connectDB();

// body parser
app.use(express.json()); // Middleware to parse JSON body

// CORS
app.use(cors({ origin: '*' }));

// API routes
app.use('/api/users', userRoutes);
app.use('/api/closetitems', closetitemRoutes);

// Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
