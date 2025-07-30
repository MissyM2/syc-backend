import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

interface AuthRequest extends Request {
  user?: { id: string; role: string };
}
export const protect = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  //function verifyToken(req: AuthRequest, res: Response, next: NextFunction) {//
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // try {
    // const authHeaders = req.headers['authorization'];
    // const token = authHeaders && authHeaders.split(' ')[1];
    // if (!token) {
    //   return res
    //     .status(401)
    //     .json({ message: 'Authentication token is missing' });
    // }
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        id: string;
        role: string;
      };
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export const authorizeRoles = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: 'Not authorized to access this route' });
    }
    next();
  };
};

//export { protect };
