import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import {
  getAllClosetitems,
  getOneClosetitem,
  getClosetitemsByUserId,
  // getClosetitem,
  addClosetitem,
  // updateClosetitem,
  deleteClosetitem,
} from '../controllers/closetitemController.js';

const closetitemRoutes = express.Router();

// Get all closetitems
closetitemRoutes.route('/allclosetitems').get(getAllClosetitems);

// get all closetitems for logged-in user
closetitemRoutes.route('/user/:userId/closetitems').get(getClosetitemsByUserId);

// Get closetitem
//closetitemRoutes.route('/closetitem').get(verifyToken, getClosetitem);

// Get one closetitem by id
closetitemRoutes.get('/:id', getOneClosetitem);

// Create a closetitem
closetitemRoutes.route('/addclosetitem').post(addClosetitem);

// Update a closetitem
//closetitemRoutes.route('/update-closetitem').put(verifyToken, updateClosetitem);

// delete a closetitem
//closetitemRoutes.route('/delete-closetitem').delete(verifyToken, deleteClosetitem);

// Add more routes for PUT, DELETE as needed
closetitemRoutes.route('/:id').delete(deleteClosetitem);

export default closetitemRoutes;
