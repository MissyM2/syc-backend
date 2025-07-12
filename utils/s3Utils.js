// utils/s3Utils.js
import 'dotenv/config.js';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// Configure your AWS S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION, // e.g., "us-east-1"
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

/**
 * Generates a presigned URL for uploading an object to S3.
 * @param {string} key The S3 object key (filename).
 * @param {string} contentType The content type of the file.
 * @returns {Promise<string>} The presigned URL.
 */
export async function generateUploadPresignedUrl(key, contentType) {
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: key,
    ContentType: contentType,
  });
  const presignedUrl = await getSignedUrl(s3Client, command, {
    expiresIn: 3600,
  }); // URL valid for 1 hour
  return presignedUrl;
}

/**
 * Generates a presigned URL for downloading an object from S3.
 * @param {string} key The S3 object key (filename).
 * @returns {Promise<string>} The presigned URL.
 */
export async function generateDownloadPresignedUrl(key) {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: key,
  });
  const presignedUrl = await getSignedUrl(s3Client, command, {
    expiresIn: 3600,
  }); // URL valid for 1 hour
  return presignedUrl;
}
