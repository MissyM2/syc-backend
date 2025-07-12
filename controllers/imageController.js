import { v4 as uuidv4 } from 'uuid';
import 'dotenv/config.js';

import {
  generateUploadPresignedUrl,
  generateDownloadPresignedUrl,
} from '../utils/s3Utils.js';

const generatePresignedUrlForUpload = async (req, res) => {
  console.log('what is req.path? ' + req.path);

  const { filename, contentType } = req.body;
  console.log('waht is req.body? ' + JSON.stringify(req.body));
  const key = `${uuidv4()}-${filename}`;
  console.log('key ' + key);
  const imageUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
  console.log('imageUrl? ' + imageUrl);

  if (!filename || !contentType) {
    return res
      .status(400)
      .json({ error: 'Filename and Content-Type are required.' });
  }

  try {
    console.log('what is key? ' + key);
    console.log('what is imageUrl? ' + imageUrl);
    const presignedUrl = await generateUploadPresignedUrl(key, contentType);
    console.log('what is presignedUrl? ' + presignedUrl);
    res.json({ presignedUrl, imageUrl });
  } catch (error) {
    console.error('Error generating upload presigned URL:', error);
    res.status(500).json({ error: 'Failed to generate upload URL.' });
  }
};

const generatePresignedUrlForDownload = async (req, res) => {
  const filename = req.params.filename;

  try {
    const presignedUrl = await generateDownloadPresignedUrl(filename);
    res.json({ presignedUrl });
  } catch (error) {
    console.error('Error generating download presigned URL:', error);
    res.status(500).json({ error: 'Failed to generate download URL.' });
  }
};

export { generatePresignedUrlForUpload, generatePresignedUrlForDownload };
