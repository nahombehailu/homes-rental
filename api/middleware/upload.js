import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Setup storage for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads/profile_images'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Single file upload middleware
const uploadSingle = multer({ storage }).single('profileImage');

// Multiple file upload middleware
const uploadMultiple = multer({ storage }).array('listingImage');

export { uploadSingle, uploadMultiple };

