import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import mongoose from 'mongoose';

const registerUser = async (req, res) => {
  console.log('registerUser');
  console.log('req 1 ' + JSON.stringify(req.body));
  const { userName, email, password, closetitems } = req.body;

  // check if email exists in db
  const userExists = await User.findOne({ email });
  console.log('userExists ' + userExists);

  if (userExists) {
    res.status(404);
    throw new Error('User already exists');
  }

  console.log('req ' + JSON.stringify(req.body));

  const user = await User.create({ userName, email, password, closetitems });
  console.log('user ' + JSON.stringify(user));

  if (user) {
    res.status(201).json({
      userName: user.userName,
      email: user.email,
      closetitems: user.closetitems,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  //check if user email exists in db
  const user = await User.findOne({ email });

  console.log('be: user? ' + JSON.stringify(user));

  // return user obj if their password matches
  if (user && (await user.matchPassword(password))) {
    res.json({
      loggedInUserInfo: {
        _id: user._id,
        userName: user.userName,
        email: user.email,
        closetitems: user.closetitems,
      },
      userToken: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
};

const getOneUser = async (req, res) => {
  // req.user was set in authMiddleware.js
  console.log(
    'inside getOneUser. what is req? ' + JSON.stringify(req.params.id)
  );
  const user = await User.findById(req.params.id);

  if (user) {
    res.json({
      id: user._id,
      userName: user.userName,
      email: user.email,
      closetitems: user.closetitems,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};

const getUserProfile = async (req, res) => {
  // req.user was set in authMiddleware.js
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      id: user._id,
      userName: user.userName,
      email: user.email,
      closetitems: user.closetitems,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};

// const getAllUsers = async (req, res) => {
//   try {
//     const user = await User.find().populate(
//       'closetitems',
//       'category itemName seasons size, desc, rating, imageId'
//     );
//     console.log('users are: ' + JSON.stringify(users));
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

const removeReferenceToDeletedClosetitem = async (req, res) => {
  console.log('removeReferenceToDeletedClosetitem');
  try {
    console.log('inside try of removeReferenceToDeletedClosetitem ');
    const userId = req.params.userId;
    const closetitemId = req.params.closetitemId;

    // Find the user by ID and populate with the array
    const user = await User.findById(userId).populate('closetitems');

    // console.log('what is user? ' + user);
    console.log('what is closetitemId? ' + closetitemId);

    if (!user) {
      throw new Error('User not found');
    }

    // Use $pull with a filter to remove the specific friend
    const result = await User.updateOne(
      { _id: userId },
      { $pull: { closetitems: closetitemId } }
    );

    if (result.modifiedCount === 0) {
      res.status(404).send("Item not found for this user's closetitem list");
      console.log("Closetitem not found in user's closetitem list");
    } else {
      console.log('Closetitem removed successfully!');
      res.json(user);
    }
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export {
  registerUser,
  loginUser,
  getUserProfile,
  //getAllUsers,
  getOneUser,
  removeReferenceToDeletedClosetitem,
};
