import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  registerUser,
  loginUser,
  getUserProfile,
  getAllUsers,
} from '../controllers/userController.js';

const router = express.Router();

// Get all users
router.get('/allusers', getAllUsers);

// Create a new user
router.post('/register', registerUser);

// login user
router.post('/login', loginUser);

// get one user's profile
router.route('/profile').get(protect, getUserProfile);

// Add more routes for PUT, DELETE as needed

export default router;
