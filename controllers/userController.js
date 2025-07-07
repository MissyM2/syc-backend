import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

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

  // return user obj if their password matches
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      userName: user.userName,
      email: user.email,
      userToken: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
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

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate(
      'closetitems',
      'category itemName seasons size, desc, rating, imageId'
    );
    console.log('users are: ' + JSON.stringify(users));
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { registerUser, loginUser, getUserProfile, getAllUsers };
