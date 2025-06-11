const express = require('express');
const database = require('../connect');
const ObjectId = require('mongodb').ObjectId;
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../.env' });

const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require('@aws-sdk/client-s3');

let awsRoutes = express.Router();

const s3Bucket = 'sycstorage';

// instantiates and configures S3Client so we can upload
// const s3Client = new S3Client({
//   region: process.env.AWS_REGION,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY,
//     secretAccessKey: process.env.AWS_SECRET_KEY,
//   },
// });
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

//#1 - Retrieve One
//http://localhost:3000/images/12345
awsRoutes.route('/images/:id').get(verifyToken, async (request, response) => {
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
awsRoutes.route('/images').post(verifyToken, async (request, response) => {
  const file = request.files[0];
  const bucketParams = {
    Bucket: s3Bucket,
    Key: file.originalname,
    Body: file.buffer,
  };

  const data = await s3Client.send(new PutObjectCommand(bucketParams));
  console.log('inside awsRoutes: data: ' + data);

  response.json(data);
});

function verifyToken(request, response, next) {
  const authHeaders = request.headers['authorization'];
  const token = authHeaders && authHeaders.split(' ')[1];
  if (!token) {
    console.log('there is no token ');
    return response
      .status(401)
      .json({ message: 'Authentication token is missing' });
  }

  jwt.verify(token, process.env.SECRET_KEY, (error, user) => {
    if (error) {
      console.log('there is an error');
      return response.status(403).json({ message: 'Invalid Token' });
    }
    next();
  });
}

module.exports = awsRoutes;
