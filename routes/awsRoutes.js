import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import 'dotenv/config.js';

// import { getImage, addImage } from '../controllers/awsController.js';
import { getImage } from '../controllers/awsController.js';

const awsRoutes = express.Router();

//#1 - Retrieve One
//http://localhost:3000/images/12345
awsRoutes.route('/getimage/:id').get(verifyToken, getImage);

///#2 - Create one
//awsRoutes.route('/upload-image').post(addImage);

awsRoutes
  .route('/upload-image')
  .post(verifyToken, async (request, response) => {
    console.log(
      'awsRoutes, made it past verifyToken: what is request? ' + request
    );
    console.log('what is request.files[0] ' + request.files[0]);
    const file = request.files[0];

    const bucketParams = {
      Bucket: s3Bucket,
      Key: file.originalname,
      Body: file.buffer,
    };

    console.log('what are bucketParams ' + JSON.stringify(bucketParams));

    const data = await s3Client.send(new PutObjectCommand(bucketParams));

    console.log('what is data? ' + JSON.stringify(data));

    response.json(data);
  });

export default awsRoutes;
