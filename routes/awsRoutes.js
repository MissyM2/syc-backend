// import 'dotenv/config.js';
// import express from 'express';
// import { verifyToken } from '../middleware/authMiddleware.js';
// import multer from 'multer';
// import { uploadImage, getImage } from '../controllers/awsController.js';

// const awsRoutes = express.Router();

// // Configure Multer for in-memory storage (or disk storage for larger files)
// const upload = multer({ storage: multer.memoryStorage() });

// //#1 - Retrieve One
// //http://localhost:3000/images/sycstorage/12345.jpeg
// awsRoutes.route('/sycstorage/:key').get(getImage);

// ///#2 - Create one
// //awsRoutes.route('/uploadimage').post(addImage);
// awsRoutes
//   .route('/upload-image')
//   .post(verifyToken, upload.single('image'), uploadImage);

// export default awsRoutes;
