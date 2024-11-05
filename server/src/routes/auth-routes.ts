import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  console.log(`Attempting login for username: ${username}`); // Log the username being used for login
  console.log(`Request Body: ${JSON.stringify(req.body)}`); // Log the request body

  try { 
    const user = await User.findOne({ where: { username } });
    console.log(`User found: ${user ? user.username : 'none'}`); // Log if the user was found

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      console.log(`Password valid: ${isPasswordValid}`); // Log if the password is valid

      if (isPasswordValid) {
        const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET_KEY!, { expiresIn: '1h' });
        console.log(`Generated Token: ${token}`); // Log the generated token
        res.json({ token });
      } else {
        res.status(401).json({ message: 'Invalid username or password' });
      }
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error: any) {
    console.error(`Login error: ${error.message}`); // Log any errors
    res.status(500).json({ message: error.message });
  }
};

// Add a function to handle user registration
const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await User.create({ username, password: hashedPassword });

    // Respond with a success message
    return res.status(201).json({ message: 'User registered successfully', user: { id: newUser.id, username: newUser.username } });
  } catch (error: any) {
    console.error(`Registration error: ${error.message}`); // Log any errors
    return res.status(500).json({ message: error.message });
  }
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

// POST /register - Register a new user
router.post('/register', register);

export default router;
