// routes/imageRoutes.js

import express from 'express';

import {
  getPresignedUrlForUpload,
  getPresignedUrlForDownload,
} from '../controllers/imageController.js';

const imageRoutes = express.Router();

// Route to get a presigned URL for uploading an image
imageRoutes.route('/upload-url').post(getPresignedUrlForUpload);

// Route to get a presigned URL for downloading an image
imageRoutes.route('/download-url/:filename').get(getPresignedUrlForDownload);

export default imageRoutes;
