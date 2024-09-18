import express from 'express';
import { uploadSingle, uploadMultiple } from '../middleware/upload.js';
import { registerUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', uploadSingle, registerUser);

export default router;