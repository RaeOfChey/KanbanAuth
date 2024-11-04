import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];

  console.log('Token:', token); // Log the extracted token

  if (!token) {
    return res.status(401).json({ message: 'Access token is missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as JwtPayload; // Use the correct key
    console.log('Decoded Token:', decoded); // Log the decoded token data
    req.user = { username: decoded.username };
    next();
  } catch (error) {
    console.error('Token Verification Error:', error); // Log the error
    return res.status(403).json({ message: 'Invalid token' });
  }

  return; // Add this return statement to satisfy TypeScript
};
