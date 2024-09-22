import express from 'express';
import { uploadSingle, uploadMultiple } from '../middleware/upload.js';
import { loginUser, registerUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', uploadSingle, registerUser);
router.post('/login', loginUser);

export default router;