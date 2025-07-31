import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

// generate token that expires in 12 hours
const generateToken = (
  userId: string,
  email: string,
  userName: string,
  userRole: string
): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  return jwt.sign(
    { id: userId, email: email, userName: userName, userRole: userRole },
    secret,
    {
      expiresIn: '12h',
    }
  );
};

export default generateToken;
