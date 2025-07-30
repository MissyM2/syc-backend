import express from 'express';
import { protect, authorizeRoles } from '../middleware/authMiddleware.ts';
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
closetRoutes.route('/:id').get(getOneClosetitem);

// Create a closetitem
closetRoutes.route('/addclosetitem').post(addClosetitem);

// Update a closetitem
//closetRoutes.route('/update-closetitem').put(verifyToken, updateClosetitem);

// delete a closetite
//closetRoutes.route('/delete-closetitem').delete(verifyToken, deleteClosetitem);

// Add more routes for PUT, DELETE as needed
closetRoutes.route('/:id').delete(deleteClosetitem);

export default closetRoutes;
