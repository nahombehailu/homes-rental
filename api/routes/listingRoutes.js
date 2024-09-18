import express from 'express';
import { createListing, getListingById, updateListing, deleteListing, getAllListings, searchListings } from '../controllers/listingController.js';
import upload from '../middleware/upload.js'; // Ensure this middleware supports multiple files
import { protect } from '../middleware/auth.js'; // Assuming you have a middleware for authentication

const router = express.Router();

// Create a new listing (protected route)
router.post('/', protect, upload.array('listingProfilePath'), createListing);

// Get all listings
router.get('/', getAllListings);

// Get a single listing by ID
router.get('/:id', getListingById);

// Update a listing (protected route)
router.put('/:id', protect, updateListing);

// Delete a listing (protected route)
router.delete('/:id', protect, deleteListing);

// Search and filter listings by category
router.get('/search', searchListings);

export default router;