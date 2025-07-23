import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import {
  registerUser,
  loginUser,
  getUserProfile,
  getAllUsers,
  getOneUser,
  removeReferenceToDeletedClosetitem,
} from '../controllers/userController.js';

const userRoutes = express.Router();

// Get all users
userRoutes.get('/allusers', getAllUsers);

// Get one user by id
userRoutes.get('/:id', getOneUser);

// Create a new user
userRoutes.post('/register', registerUser);

// login user
userRoutes.post('/login', loginUser);

// get one user's profile
userRoutes.route('/profile').get(verifyToken, getUserProfile);

// Add more routes for PUT, DELETE as needed

// Update existing user, delete a itemId from the user's closetitems array
//userRoutes.route('/:userId/closetitems/:itemId', deleteClosetitemIdFromUser);

// update a closetitem.  Remove one of the references to a closetitem id
userRoutes
  .route('/:userId/closetitems/:itemId')
  .get(removeReferenceToDeletedClosetitem);

export default userRoutes;
