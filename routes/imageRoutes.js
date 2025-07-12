// routes/imageRoutes.js

import express from 'express';
import {
  generateUploadPresignedUrl,
  generateDownloadPresignedUrl,
} from '../utils/s3Utils.js';

const router = express.Router();

// Route to get a presigned URL for uploading an image
router.post('/upload-url', async (req, res) => {
  console.log('what is req? ' + req.body);
  const { filename, contentType } = req.body;

  if (!filename || !contentType) {
    return res
      .status(400)
      .json({ error: 'Filename and Content-Type are required.' });
  }

  try {
    const presignedUrl = await generateUploadPresignedUrl(
      filename,
      contentType
    );
    res.json({ presignedUrl });
  } catch (error) {
    console.error('Error generating upload presigned URL:', error);
    res.status(500).json({ error: 'Failed to generate upload URL.' });
  }
});

// Route to get a presigned URL for downloading an image
router.get('/download-url/:filename', async (req, res) => {
  const filename = req.params.filename;

  try {
    const presignedUrl = await generateDownloadPresignedUrl(filename);
    res.json({ presignedUrl });
  } catch (error) {
    console.error('Error generating download presigned URL:', error);
    res.status(500).json({ error: 'Failed to generate download URL.' });
  }
});

export default router;
