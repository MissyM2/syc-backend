import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import {
  getAllClosetitems,
  getOneClosetitem,
  fetchClosetitems,
  // getClosetitem,
  addClosetitem,
  // updateClosetitem,
  deleteClosetitem,
} from '../controllers/closetController.js';

const closetRoutes = express.Router();

// Get all closetitems
closetRoutes.route('/allclosetitems').get(getAllClosetitems);

// get all closetitems for logged-in user
closetRoutes.route('/user/:userId/closetitems').get(fetchClosetitems);

// Get closetitem
//closetRoutes.route('/closetitem').get(verifyToken, getClosetitem);

// Get one closetitem by id
closetRoutes.get('/:id', getOneClosetitem);

// Create a closetitem
closetRoutes.route('/addclosetitem').post(addClosetitem);

// Update a closetitem
//closetRoutes.route('/update-closetitem').put(verifyToken, updateClosetitem);

// delete a closetitem
//closetRoutes.route('/delete-closetitem').delete(verifyToken, deleteClosetitem);

// Add more routes for PUT, DELETE as needed
closetRoutes.route('/:id').delete(deleteClosetitem);

export default closetRoutes;
