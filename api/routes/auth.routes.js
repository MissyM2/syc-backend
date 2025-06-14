const express = require('express');
const database = require('../connect');
const ObjectId = require('mongodb').ObjectId;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../.env' });

let router = express.Router();
const User = require('../models/user.model');
const { hash } = require('crypto');

const SALT_ROUNDS = 6;

//  Register user

router.route('/api/register').post(async (request, response) => {
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

// router.route('/api/register').post(async (request, response) => {
//   res.send('inside authRoutes!');
//   // let db = database.getDb();
//   // let collection = await db.collection('users');
// });

module.exports = router;
