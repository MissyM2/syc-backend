const express = require('express');
const database = require('../connect');
const ObjectId = require('mongodb').ObjectId;

let userRoutes = express.Router();
const User = require('../models/user.model');

// #1 Retrieve All
//http://localhost:3000/syc/users
userRoutes.route('/syc/users').get(async (request, response) => {
  let db = database.getDb();

  try {
    let collection = await db.collection('users');
    let result = await collection.find({}).toArray();
    if (result.length > 0) {
      response.json(result);
    }
  } catch (err) {
    response.status(500).json({ message: err.message });
  }
});

//#2 - Retrieve One
//http://localhost:3000/users/12345
userRoutes.route('/syc/users/:id').get(async (request, response) => {
  const query = { _id: new ObjectId(request.params.id) };
  let db = database.getDb();

  try {
    let collection = await db.collection('users');
    let result = await collection.findOne(query);
    if (result) {
      response.json(result);
    }
  } catch (err) {
    response.status(500).json({ message: err.message });
  }
});

//#3 - Create one
userRoutes.route('/syc/users').post(async (request, response) => {
  let db = database.getDb();
  let collection = await db.collection('users');

  try {
    const takenEmailAddress = await collection.findOne({
      emailAddress: request.body.emailAddress,
    });

    if (takenEmailAddress) {
      response.json({ message: 'The email is taken' });
    } else {
      let newDocument = {
        name: request.body.name,
        emailAddress: request.body.emailAddress,
      };
      let result = await collection.insertOne(newDocument);
      response.status(201).json(result);
    }
  } catch (err) {
    response.status(400).json({ message: err.message });
  }
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
  const query = { _id: new ObjectId(request.params.id) };
  let db = database.getDb();

  try {
    const collection = db.collection('users');
    let result = await collection.deleteOne(query);
    response.json(result);
  } catch (err) {
    response.status(500).json({ message: err.message });
  }
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
