const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

// Getting all
router.get('/', async (req, res) => {
  //res.send('Hello World');
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting One
router.get('/:id', getUser, (req, res) => {
  res.json(res.user.name);
});

// Creating one
router.post('/', async (req, res) => {
  const user = new User({
    name: req.body.name,
    emailAddress: req.body.emailAddress,
  });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Updating One
router.patch('/:id', getUser, async (req, res) => {
  if (req.body.name != null) {
    res.subscriber.name = req.body.name;
  }
  if (req.body.email != null) {
    res.user.email = req.body.emailAddress;
  }
  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting One
router.delete('/:id', getUser, async (req, res) => {
  //res.send(res.user._id);

  try {
    await User.deleteOne(res.user._id);
    res.json({ message: 'Deleted User' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: 'Cannot find user' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.user = user;
  next();
}

module.exports = router;
