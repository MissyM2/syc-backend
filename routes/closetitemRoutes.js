import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import {
  getAllClosetitems,
  getClosetitemsByUserId,
  // getClosetitem,
  addClosetitem,
  // updateClosetitem,
  // deleteClosetitem,
} from '../controllers/closetitemController.js';

const router = express.Router();

// Get all closetitems
router.route('/allclosetitems').get(getAllClosetitems);

// get all closetitems for logged-in user
router.route('/user/:userId/closetitems').get(getClosetitemsByUserId);

// Get closetitem
//router.route('/closetitem').get(verifyToken, getClosetitem);

// Create a closetitem
router.route('/addclosetitem').post(addClosetitem);

// Update a closetitem
//router.route('/update-closetitem').put(verifyToken, updateClosetitem);

// delete a closetitem
//router.route('/delete-closetitem').delete(verifyToken, deleteClosetitem);

// Add more routes for PUT, DELETE as needed

export default router;
