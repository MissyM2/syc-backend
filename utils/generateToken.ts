import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

// generate token that expires in 12 hours
const generateToken = (userId: string, role: string): string => {
  return jwt.sign({ id: userId, role }, process.env.JWT_SECRET, {
    expiresIn: '12h',
  });
};

export default generateToken;
