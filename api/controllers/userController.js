import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import { generateToken } from '../utils/createToken.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const registerUser = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const profileImage = req.file;
        const listingImages = req.files; // This will hold the array of files

        const profileImagePath = profileImage.path
       

        const userExists = await User.findOne({ email });
        if (userExists) {
            return next(errorHandler(409, "User already exists"));
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            profileImagePath
        
    
        });

        await newUser.save();
        generateToken(res, newUser._id);

        const { password: pass, ...rest } = newUser._doc;
        
        res.status(201).json(newUser); // Return user data without the password

    } catch (error) {
        next(error);
    }
};

export const loginUser = async (req, res, next) => {
    try {
      const { email, password } = req.body;
  
      // Find the user by email
      const user = await User.findOne({ email });
  
      if (!user) {
        return next(errorHandler(404, 'User not found'));
      }
  
      // Check if the password is correct
      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        return next(errorHandler(401, 'Invalid email or password'));
      }
  
      // Generate a token
      const token=generateToken(res, user._id);
  
      // Return the user data without the password
      const { password: pass, ...userResponse } = user._doc;
      res.status(200).json({ user: userResponse, token });
    } catch (error) {
      next(error);
    }
  };
  