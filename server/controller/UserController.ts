import User from "../model/User_model";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

interface SignupRequest extends Request {
  body: {
    username: string;
    email: string;
    phone: string;
    password: string;
    role: 'CI' | 'MI' | 'Admin';
  };
}

export const signupcontroller = async (req: SignupRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { username, email, phone, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    // Create a new user
    const newUser = new User({
      username,
      email,
      phone,
      password,
      role
    });

    // Save the user to the database
    await newUser.save();

    // Generate a JWT token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    res.status(201).json({ message: 'User created successfully', token });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

interface LoginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

export const logincontroller = async (req: LoginRequest, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    // Check if password is correct
    const isPasswordValid = password === user.password ? true : false;
    if (!isPasswordValid) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    res.status(200).json({ message: 'Logged in successfully', token, user });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const logoutcontroller = async (req: Request, res: Response): Promise<void> => {
  try {
    // Invalidate the token (implementation depends on your token management strategy)
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Error logging out:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};