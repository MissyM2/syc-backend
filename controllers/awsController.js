import 'dotenv/config.js';
import { Upload } from '@aws-sdk/lib-storage';
import fs from 'fs';

import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

//#1 - Retrieve One
//http://localhost:3000/images/12345
// const getImage = async (req, res) => {
//   console.log('inside getImage, req is : ' + JSON.stringify(req.body));
//   try {
//     const id = req.params.id;
//     const bucketParams = {
//       Bucket: s3Bucket,
//       Key: id,
//     };

//     const data = await s3Client.send(new GetObjectCommand(bucketParams));

//     const contentType = data.ContentType;
//     const srcString = await data.Body.transformToString('base64');
//     const imageSource = `data:${contentType};base64, ${srcString}`;

//     res.json(imageSource);
//   } catch (err) {
//     console.log(err);
//   }
// };

///#2 - Create one
const uploadImage = async (req, res) => {
  console.log('what is path? ' + req.path);
  console.log('what is req.body? ' + req.file);
  if (!req.file) {
    return res.status(400).send('No image file uploaded.');
  }

  const file = req.file;
  const fileName = `${Date.now()}-${file.originalname}`;

  try {
    const parallelUploads3 = new Upload({
      client: s3Client,
      params: {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: fileName,
        Body: file.buffer, // Use file.buffer for in-memory storage
        ContentType: file.mimetype,
        //ACL: 'public-read', // Make the uploaded image publicly accessible
      },
    });

    parallelUploads3.on('httpUploadProgress', (progress) => {
      console.log(progress);
    });

    const data = await parallelUploads3.done();
    res.status(200).json({
      message: 'Image uploaded successfully!',
      location: data.Location,
    });
  } catch (error) {
    console.error('Error uploading image to S3:', error);
    res.status(500).send('Error uploading image.');
  }
};

export { uploadImage };
//export { getImage };
