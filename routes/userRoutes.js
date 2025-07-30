import express from 'express';
import { protect, authorizeRoles } from '../middleware/authMiddleware.ts';
import {
  registerUser,
  loginUser,
  getUserProfile,
  getAllUsers,
  getOneUser,
  removeReferenceToDeletedClosetitem,
  addReferenceToNewClosetitem,
} from '../controllers/userController.js';

const userRoutes = express.Router();

// Get all users
userRoutes.route('/allusers').get(protect, authorizeRoles('user'), getAllUsers);

// Get one user by id
userRoutes.get('/:id', getOneUser);

// Create a new user
userRoutes.route('/register').post(registerUser);

// login user
userRoutes.route('/login').post(loginUser);

// update a user with additional closetitem
userRoutes
  .route('/:userId/closetitems/:closetitemId')
  .put(addReferenceToNewClosetitem);

// get one user's profile
//userRoutes.route('/profile').get(verifyToken, getUserProfile);

// Add more routes for PUT, DELETE as needed

// Update existing user, delete a itemId from the user's closetitems array
//userRoutes.route('/:userId/closetitems/:itemId', deleteClosetitemIdFromUser);

// update a closetitem.  Remove one of the references to a closetitem id
userRoutes
  .route('/:userId/closetitems/:closetitemId')
  .delete(removeReferenceToDeletedClosetitem);

export default userRoutes;
