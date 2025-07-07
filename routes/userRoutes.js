import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import {
  registerUser,
  loginUser,
  getUserProfile,
  getAllUsers,
} from '../controllers/userController.js';

const userRoutes = express.Router();

// Get all users
userRoutes.get('/allusers', getAllUsers);

// Create a new user
userRoutes.post('/register', registerUser);

// login user
userRoutes.post('/login', loginUser);

// get one user's profile
userRoutes.route('/profile').get(verifyToken, getUserProfile);

// Add more routes for PUT, DELETE as needed

export default userRoutes;
