const express = require('express');
const database = require('../connect');
const ObjectId = require('mongodb').ObjectId;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../.env' });

let authRouter = express.Router();
const User = require('../models/user.model');
const { hash } = require('crypto');

const SALT_ROUNDS = 6;

//  Register user

authRouter.route('/api/register').post(async (request, response) => {
  console.log('made it to authRoutes.');

  let db = database.getDb();
  let collection = await db.collection('users');
  try {
    const takenEmailAddress = await collection.findOne({
      emailAddress: request.body.emailAddress,
    });

    if (takenEmailAddress) {
      response.json({ message: 'The email is taken' });
    } else {
      const hash = await bcrypt.hash(request.body.password, SALT_ROUNDS);
      let mongoObject = {
        name: request.body.name,
        emailAddress: request.body.emailAddress,
        password: hash,
        joinDate: new Date(),
        closetitems: [],
      };
      let result = await collection.insertOne(mongoObject);
      response.status(201).json(result);
    }
  } catch (err) {
    response.status(400).json({ message: err.message });
  }
});

// Login User

authRouter.route('/api/login').post(async (request, response) => {
  let db = database.getDb();

  const user = await db
    .collection('users')
    .findOne({ emailAddress: request.body.emailAddress });

  if (user) {
    let confirmation = await bcrypt.compare(
      request.body.password,
      user.password
    );
    if (confirmation) {
      const token = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '1h' });
      response.json({ success: true, token });
    } else {
      response.json({ success: false, message: 'Incorrect Password' });
    }
  } else {
    response.json({ success: false, message: 'User not found' });
  }
});

module.exports = authRouter;
