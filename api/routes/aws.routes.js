const express = require('express');
const database = require('../connect');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config({ path: '../.env' });

const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require('@aws-sdk/client-s3');

let awsRoutes = express.Router();

const s3Bucket = 'sycstorage';

const s3Client = new S3Client({
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});

//#1 - Retrieve One
//http://localhost:3000/images/12345
awsRoutes
  .route('/syc/images/:id')
  .get(verifyToken, async (request, response) => {
    const id = request.params.id;
    const bucketParams = {
      Bucket: s3Bucket,
      Key: id,
    };

    const data = await s3Client.send(new GetObjectCommand(bucketParams));

    const contentType = data.ContentType;
    const srcString = await data.Body.transformToString('base64');
    const imageSource = `data:${contentType};base64, ${srcString}`;

    response.json(imageSource);
  });

///#2 - Create one
awsRoutes.route('/syc/images').post(verifyToken, async (request, response) => {
  const file = request.files[0];
  const bucketParams = {
    Bucket: s3Bucket,
    Key: file.name,
    Body: file,
  };

  const data = await s3Client.send(new PutObjectCommand(bucketParams));
  response.json(data);
});

//#3 - Delete one
// awsRoutes
//   .route('/syc/images/:id')
//   .delete(verifyToken, async (request, response) => {
//     const query = { _id: new ObjectId(request.params.id) };
//     let db = database.getDb();

//     try {
//       const collection = db.collection('images');
//       let result = await collection.deleteOne(query);
//       response.json(result);
//     } catch (err) {
//       response.status(500).json({ message: err.message });
//     }
//   });

function verifyToken(request, response, next) {
  const authHeaders = request.headers['authorization'];
  const token = authHeaders && authHeaders.split(' ')[1];
  console.log(request);
  if (!token) {
    return response
      .status(401)
      .json({ message: 'Authentication token is missing' });
  }

  jwt.verify(token, process.env.SECRETKEY, (error, user) => {
    if (error) {
      return response.status(403).json({ message: 'Invalid Token' });
    }
    next();
  });
}

module.exports = awsRoutes;
