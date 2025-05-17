const express = require('express');
const database = require('../connect');
const ObjectId = require('mongodb').ObjectId;
const mongoose = require('mongoose');

let userRoutes = express.Router();
const User = require('../models/user.model');

// #1 Retrieve All
//http://localhost:3000/syc/users
userRoutes.route('/syc/users').get(async (request, response) => {
  //response.send('Hello World');

  let db = database.getDb();
  let data = await db.collection('users').find({}).toArray();
  if (data.length > 0) {
    response.json(data);
  } else {
    throw new Error('Data was not found.');
  }
  // try {
  //   let
  //   const users = await User.find();
  //   response.json(users);
  // } catch (err) {
  //   response.status(500).json({ message: err.message });
  // }
});

//#2 - Retrieve One
//http://localhost:3000/users/12345
userRoutes.route('/syc/users/:id').get(async (request, response) => {
  let db = database.getDb();
  let data = await db.collection('users').findOne({
    _id: new ObjectId(request.params.id),
  });

  if (data) {
    response.json(data);
  } else {
    throw new Error('Data was not found.');
  }
});

//#3 - Create one
userRoutes.route('/syc/users').post(async (request, response) => {
  let db = database.getDb();

  const takenEmailAddress = await db
    .collection('users')
    .findOne({ emailAddress: request.body.emailAddress });

  if (takenEmailAddress) {
    response.json({ message: 'The email is taken' });
  } else {
    let mongoObject = {
      name: request.body.name,
      emailAddress: request.body.emailAddress,
    };

    let data = await db.collection('users').insertOne(mongoObject);
    response.json(data);
  }
  // const user = new User({
  //   name: request.body.name,
  //   emailAddress: request.body.emailAddress,
  // });
  // try {
  //   const newUser = await user.save();
  //   response.status(201).json(newUser);
  // } catch (err) {
  //   response.status(400).json({ message: err.message });
  // }
});

//#4 - Update one
userRoutes.route('/syc/users/:id').patch(async (request, response) => {
  const query = { _id: new ObjectId(request.params.id) };
  const updates = {
    $set: { name: request.body.name, emailAddress: request.body.emailAddress },
  };
  let db = database.getDb();

  try {
    let result = await db.collection('users').updateOne(query, updates);

    response.json(result);
  } catch (err) {
    response.status(400).json({ message: err.message });
  }
});

//#5 - Delete one
userRoutes.route('/syc/users/:id').delete(async (request, response) => {
  let db = database.getDb();
  let data = await db
    .collection('Users')
    .deleteOne({ _id: request.params._id });
  response.json(data);
  //response.send(response.user._id);

  // try {
  //   await User.deleteOne(response.user._id);
  //   response.json({ message: 'Deleted User' });
  // } catch (err) {
  //   response.status(500).json({ message: err.message });
  // }
});

//#6 - Login
// userRoutes.route("/users/login").post(async (request, response) => {
//     let db = database.getDb()

//     const user = await db.collection("users").findOne({email: request.body.email})

//     if (user) {
//         let confirmation = await bcrypt.compare(request.body.password, user.password)
//         if (confirmation) {
//             const token = jwt.sign(user, process.env.SECRETKEY, {expiresIn: "1h"})
//             response.json({success: true, token})
//         } else {
//             response.json({success: false, message: "Incorrect Password"})
//         }
//     } else {
//         response.json({success: false, message: "User not found"})
//     }

module.exports = userRoutes;
