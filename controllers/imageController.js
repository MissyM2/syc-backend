// controllers/s3Controller.js
// import 'dotenv/config.js';
// import { getSignedUrl } from '@aws-sdk/s3-request-presigner'; //
// import {
//   S3Client,
//   PutObjectCommand,
//   GetObjectCommand,
// } from '@aws-sdk/client-s3'; //

// // Configure AWS credentials (using environment variables is recommended)
// const config = {
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   },
//   region: process.env.AWS_S3_REGION, // e.g., 'us-east-1'
// };

// // Create a new S3 client
// const s3Client = new S3Client(config);

// // Controller function to get a presigned URL for uploading an object
// export async function getPresignedPutUrl(req, res) {
//   const { fileName, fileType } = req.body; // Expect fileName and fileType from request body

//   const putObjectParams = {
//     Bucket: process.env.AWS_S3_BUCKET_NAME,
//     Key: fileName,
//     ContentType: fileType,
//   };

//   try {
//     const command = new PutObjectCommand(putObjectParams);
//     const presignedUrl = await getSignedUrl(s3Client, command, {
//       expiresIn: 3600,
//     }); // URL expires in 1 hour (3600 seconds)
//     res.json({ presignedUrl });
//   } catch (error) {
//     console.error('Error generating presigned URL:', error);
//     res.status(500).json({ error: 'Failed to generate presigned URL' });
//   }
// }

// // Controller function to get a presigned URL for downloading an object
// export async function getPresignedGetUrl(req, res) {
//   const { fileName } = req.params; // Expect fileName from request parameters

//   const getObjectParams = {
//     Bucket: process.env.AWS_S3_BUCKET_NAME,
//     Key: fileName,
//   };

//   try {
//     const command = new GetObjectCommand(getObjectParams);
//     const presignedUrl = await getSignedUrl(s3Client, command, {
//       expiresIn: 3600,
//     }); // URL expires in 1 hour (3600 seconds)
//     res.json({ presignedUrl });
//   } catch (error) {
//     console.error('Error generating presigned URL:', error);
//     res.status(500).json({ error: 'Failed to generate presigned URL' });
//   }
// }

// //export { getPresignedPutUrl };
