import 'dotenv/config.js';

import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';

const s3Bucket = 'sycstorage';

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

//#1 - Retrieve One
//http://localhost:3000/images/12345
const getImage = async (request, response) => {
  try {
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
  } catch (err) {
    console.log(err);
  }
};

///#2 - Create one
// const addImage = async (request, response) => {
//   try {
//     console.log('inside addImage: what is request? ' + request.files);
//     const file = request.files[0];

//     console.log('what is file? ' + file);
//     const bucketParams = {
//       Bucket: s3Bucket,
//       Key: file.originalname,
//       Body: file.buffer,
//     };

//     console.log('what is bucketParams? ' + JSON.stringify(bucketParams));

//     const data = await s3Client.send(new PutObjectCommand(bucketParams));

//     console.log('what is data? ' + JSON.stringify(data));

//     response.json(data);
//   } catch (err) {
//     console.log(err);
//   }
// };

// export { getImage, addImage };
export { getImage };
