import 'dotenv/config.js';
import { Upload } from '@aws-sdk/lib-storage';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
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

// Function to generate a pre-signed URL for upload
async function generateUploadPresignedUrl(bucketName, key, contentType) {
  console.log('generateUploadPresignedUrl');
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    ContentType: contentType, // Specify the Content-Type for the file
  });

  const signedUrl = await getSignedUrl(s3Client, command, {
    expiresIn: 3600, // URL expires in 1 hour (adjust as needed)
  });

  return signedUrl;
}

const getImage = async (req, res) => {
  console.log('inside getImage');
  //const { imageKey } = req.params; // Get the image key from the URL parameter
  const bucketName = 'sycstorage'; // Replace with your S3 bucket nameconst bucketName = 'sycstorage'; // Replace with your S3 bucket name
  const filePath = 'CJMClassPics.jpeg'; // Path where the file will be stored in S3
  const fileContentType = 'image/jpeg';

  const uploadUrl = await generateUploadPresignedUrl(
    bucketName,
    filePath,
    fileContentType
  );
  console.log('Pre-signed upload URL:', uploadUrl);

  // try {
  //   const data = await s3Client.send(
  //     new GetObjectCommand({
  //       Bucket: bucketName,
  //       Key: '1752185076304-RandomDatePic_0001.jpeg',
  //     })
  //   );

  //   // Set the Content-Type header based on the image's MIME type
  //   if (data.ContentType) {
  //     res.setHeader('Content-Type', data.ContentType);
  //   }

  //   // Pipe the image stream directly to the response
  //   data.Body.pipe(res);
  // } catch (err) {
  //   console.error('Error retrieving image from S3:', err);
  //   res.status(500).send('Error retrieving image from S3');
  // }
};

//#1 - Retrieve One
//http://localhost:3000/images/12345
// const getImage = async (req, res) => {
//   console.log('inside getImage');
//   const { imageKey } = req.params; // Get the image key from the URL parameter
//   const bucketName = 'sycstorage'; // Replace with your S3 bucket name

//   try {
//     const data = await s3Client.send(
//       new GetObjectCommand({
//         Bucket: bucketName,
//         Key: '1752185076304-RandomDatePic_0001.jpeg',
//       })
//     );

//     // Set the Content-Type header based on the image's MIME type
//     if (data.ContentType) {
//       res.setHeader('Content-Type', data.ContentType);
//     }

//     // Pipe the image stream directly to the response
//     data.Body.pipe(res);
//   } catch (err) {
//     console.error('Error retrieving image from S3:', err);
//     res.status(500).send('Error retrieving image from S3');
//   }
// };

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

///#2 - Create one
// const uploadImage = async (req, res) => {
//   console.log('what is path? ' + req.path);
//   console.log('what is req.body? ' + req.file);
//   if (!req.file) {
//     return res.status(400).send('No image file uploaded.');
//   }

//   const file = req.file;
//   const fileName = `${Date.now()}-${file.originalname}`;

//   try {
//     const parallelUploads3 = new Upload({
//       client: s3Client,
//       params: {
//         Bucket: process.env.S3_BUCKET_NAME,
//         Key: fileName,
//         Body: file.buffer, // Use file.buffer for in-memory storage
//         ContentType: file.mimetype,
//         //ACL: 'public-read', // Make the uploaded image publicly accessible
//       },
//     });

//     parallelUploads3.on('httpUploadProgress', (progress) => {
//       console.log(progress);
//     });

//     const data = await parallelUploads3.done();
//     res.status(200).json({
//       message: 'Image uploaded successfully!',
//       location: data.Location,
//     });
//   } catch (error) {
//     console.error('Error uploading image to S3:', error);
//     res.status(500).send('Error uploading image.');
//   }
// };

export { uploadImage, getImage };
