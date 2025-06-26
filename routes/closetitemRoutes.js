const express = require('express');
const database = require('../api/connect');
const ObjectId = require('mongodb').ObjectId;
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../.env' });

let closetitemRoutes = express.Router();

// #1 Retrieve All
//http://localhost:3000/syc/closetitems
closetitemRoutes
  .route('/syc/closetitems')
  .get(verifyToken, async (request, response) => {
    let db = database.getDb();

    try {
      let collection = await db.collection('closetitems');
      let result = await collection.find({}).toArray();
      if (result.length > 0) {
        response.json(result);
      }
    } catch (err) {
      response.status(500).json({ message: err.message });
    }
  });

//#2 - Retrieve One
//http://localhost:3000/closetitems/12345
closetitemRoutes
  .route('/syc/closetitems/:id')
  .get(verifyToken, async (request, response) => {
    const query = { _id: new ObjectId(request.params.id) };
    let db = database.getDb();

    try {
      let collection = await db.collection('closetitems');
      let result = await collection.findOne(query);
      if (result) {
        response.json(result);
      }
    } catch (err) {
      response.status(500).json({ message: err.message });
    }
  });

///#3 - Create one
closetitemRoutes.route('/syc/closetitems').post(async (request, response) => {
  let db = database.getDb();
  let collection = await db.collection('closetitems');

  try {
    const takenName = await collection.findOne({
      category: request.body.category,
      name: request.body.name,
      season: request.body.season,
      size: request.body.size,
      desc: request.body.desc,
      rating: request.body.rating,
      dateCreated: request.body.dateCreated,
      imageId: request.body.imageId,
    });

    if (takenName) {
      response.json({ message: 'The clothing item is taken' });
    } else {
      let newDocument = {
        category: request.body.category,
        name: request.body.name,
        season: request.body.seasons,
        size: request.body.size,
        desc: request.body.desc,
        rating: request.body.rating,
        dateCreated: request.body.dateCreated,
        imageId: request.body.imageId,
      };
      let result = await collection.insertOne(newDocument);
      response.status(201).json(result);
    }
  } catch (err) {
    response.status(400).json({ message: err.message });
  }
});

///#4 - Update one
closetitemRoutes
  .route('/syc/closetitems/:id')
  .patch(async (request, response) => {
    const query = { _id: new ObjectId(request.params.id) };
    const updates = {
      $set: {
        category: request.body.category,
        name: request.body.name,
        season: request.body.season,
        size: request.body.size,
        desc: request.body.desc,
        rating: request.body.rating,
      },
    };

    let db = database.getDb();

    try {
      let result = await db.collection('closetitems').updateOne(query, updates);
      response.json(result);
    } catch (err) {
      response.status(400).json({ message: err.message });
    }
  });

//#5 - Delete one
closetitemRoutes
  .route('/syc/closetitems/:id')
  .delete(verifyToken, async (request, response) => {
    const query = { _id: new ObjectId(request.params.id) };
    let db = database.getDb();

    try {
      const collection = db.collection('closetitems');
      let result = await collection.deleteOne(query);
      response.json(result);
    } catch (err) {
      response.status(500).json({ message: err.message });
    }
  });

function verifyToken(request, response, next) {
  const authHeaders = request.headers['authorization'];
  const token = authHeaders && authHeaders.split(' ')[1];
  if (!token) {
    return response
      .status(401)
      .json({ message: 'Authentication token is missing' });
  }

  jwt.verify(token, process.env.SECRET_KEY, (error, user) => {
    if (!error) {
      request.user = user.name;
      next();
    } else {
      return response.status(403).json({ message: 'Invalid Token' });
    }
  });
}

module.exports = closetitemRoutes;
