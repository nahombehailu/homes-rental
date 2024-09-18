
import express from 'express';
import multer from 'multer';
import path from 'path';
import User from '../models/userModel.js';
import { errorHandler } from '../utils/error.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/createToken.js';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Setup storage for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads/profile_images')); // Use path.join for cross-platform compatibility
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // File naming convention
    }
});

const upload = multer({ storage });

router.post('/register', upload.single('profileImage'), async (req, res, next) => {
    try {
        const { firstName, lastName, email, password } = req.body;


        const profileImage = req.file;
        if (!profileImage) {
            return res.status(400).send('No file uploaded.');
        }

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
            profileImagePath: profileImagePath // Optionally store path in user model
        });

        await newUser.save();
        generateToken(res, newUser._id);

        const { password: pass, ...rest } = newUser._doc;
        res.status(201).json(rest); // Return user data without the password

    } catch (error) {
        next(error);
    }
});

export default router;