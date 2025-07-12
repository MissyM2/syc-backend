import {
  generateUploadPresignedUrl,
  generateDownloadPresignedUrl,
} from '../utils/s3Utils.js';

const generatePresignedUrlForUpload = async (req, res) => {
  console.log('what is req? ' + JSON.stringify(req.body));
  console.log('what is req.path? ' + req.path);
  //const { filename, contentType } = req.body;
  const filename = req.body.filename;
  const contentType = req.body.contentType;

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
    console.log('what is presignedUrl? ' + presignedUrl);
    res.json({ presignedUrl });
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
