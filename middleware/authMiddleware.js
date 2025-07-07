import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

// const verifyToken = async (req, res, next) => {
//   let token;
//   const authHeader = req.headers.authorization;
//   console.log('what is token? ' + token);
//   console.log('what is authHeader? ' + authHeader);

//   if (authHeader && authHeader.startsWith('Bearer')) {
//     try {
//       // extract token from authHeader string
//       token = authHeader.split(' ')[1];
//       console.log('waht is token after split? ' + token);

//       // verified token returns user id
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       console.log('what is decoded? ' + decoded);

//       // find user's obj in db and assign to req.user
//       req.user = await User.findById(decoded.id).select('-password');

//       console.log('what is req.user? ' + req.user);

//       next();
//     } catch (error) {
//       res.status(401);
//       throw new Error('Not authorized, invalid token');
//     }
//   }

//   if (!token) {
//     res.status(401);
//     throw new Error('Not authorized, no token found');
//   }
// };

function verifyToken(request, response, next) {
  try {
    const authHeaders = request.headers['authorization'];
    const token = authHeaders && authHeaders.split(' ')[1];
    console.log('verifyToken: what is token after split? ' + token);
    if (!token) {
      console.log('there is no token ');
      return response
        .status(401)
        .json({ message: 'Authentication token is missing' });
    }
    console.log('verifyToken: what is token before verify? ' + token);
    console.log(
      'verifyToken: process.env.JWT_SECRET ' + process.env.JWT_SECRET
    );

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('what is decoded? ' + JSON.stringify(decoded));
    request.user = decoded;
    console.log('verifyToken: who is user? ' + JSON.stringify(request.user));
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(401).json({ message: 'Invalid or expired token.' });
  }
}

export { verifyToken };
