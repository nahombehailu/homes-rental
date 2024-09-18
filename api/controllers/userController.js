import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import { generateToken } from '../utils/createToken.js';

export const registerUser = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const profileImage = req.file;
        const listingImages = req.files; // This will hold the array of files

        const profileImagePath = profileImage.path;
       

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
            profileImagePath,
            listingImagePaths // Store listing image paths in user model
        });

        await newUser.save();
        generateToken(res, newUser._id);

        const { password: pass, ...rest } = newUser._doc;
        res.status(201).json(rest); // Return user data without the password

    } catch (error) {
        next(error);
    }
};