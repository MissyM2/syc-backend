import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.ts';
import mongoose from 'mongoose';

// CREATE A NEW USER
const registerUser = async (req, res) => {
  const { userName, email, password, userRole, closetitems } = req.body;

  // check if email exists in db
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(404);
    throw new Error('User already exists');
  }

  const user = await User.create({
    userName,
    email,
    password,
    userRole,
    closetitems,
  });

  if (user) {
    res.status(201).json({
      userName: user.userName,
      email: user.email,
      userRole: user.userRole,
      closetitems: user.closetitems,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
};

// FIND AND RETURN AN EXISTING USER
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      currentUser: {
        _id: user._id,
        userName: user.userName,
        email: user.email,
        userRole: user.userRole,
        closetitems: user.closetitems,
      },
      userToken: generateToken(
        user._id,
        user.email,
        user.userName,
        user.userRole
      ),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
};

const getOneUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.json({
      id: user._id,
      userName: user.userName,
      email: user.email,
      userRole: user.userRole,
      closetitems: user.closetitems,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};

// GET USER PROFILE
const getUserProfile = async (req, res) => {
  // req.user was set in authMiddleware.js
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      id: user._id,
      userName: user.userName,
      email: user.email,
      userRole: user.userRole,
      closetitems: user.closetitems,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate('closetitems');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE CLOSETITEM FROM CLOSETITEMS ARRAY IN USER
const removeReferenceToDeletedClosetitem = async (req, res) => {
  try {
    const userId = req.params.userId;
    const closetitemId = req.params.closetitemId;

    // Find the user by ID and populate with the array
    const user = await User.findById(userId).populate('closetitems');

    if (!user) {
      throw new Error('User not found');
    }

    const result = await User.updateOne(
      { _id: userId },
      { $pull: { closetitems: closetitemId } }
    );

    if (result.modifiedCount === 0) {
      res.status(404).send("Item not found for this user's closetitem list");
    } else {
      res.json(user);
    }
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ADD CLOSETITEM TO CLOSETITEMS ARRAY IN USER
const addReferenceToNewClosetitem = async (req, res) => {
  try {
    const userId = req.params.userId;
    const closetitemId = req.params.closetitemId;

    // Find the user by ID and populate with the array
    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { closetitems: closetitemId } },
      { new: true }
    );
    if (!user) {
      throw new Error('User not found');
    }

    res.status(200).json({ message: 'Closet item added successfully', user });
  } catch (error) {
    console.error('Error adding item:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export {
  registerUser,
  loginUser,
  getUserProfile,
  getAllUsers,
  getOneUser,
  removeReferenceToDeletedClosetitem,
  addReferenceToNewClosetitem,
};
