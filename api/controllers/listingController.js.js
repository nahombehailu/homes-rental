import Listing from '../models/listingModel.js'; // Adjust the path as necessary
import { errorHandler } from '../utils/error.js';

export const createListing = async (req, res, next) => {
    try {
        const { creator, category, type, streatAddress, aptSuite, city, province, country, guestCount, bedroomCount, bedCount, bathroomCount, amenities, title, description, highlight, highlightDesc, price } = req.body;
        const listingProfilePath = req.files.map(file => file.path); // Assuming you are using a middleware that handles multiple file uploads

        const newListing = new Listing({
            creator,
            category,
            type,
            streatAddress,
            aptSuite,
            city,
            province,
            country,
            guestCount,
            bedroomCount,
            bedCount,
            bathroomCount,
            amenities,
            listingProfilePath,
            title,
            description,
            highlight,
            highlightDesc,
            price
        });

        await newListing.save();
        res.status(201).json(newListing);
    } catch (error) {
        next(error);
    }
};

export const getListingById = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            return next(errorHandler(404, "Listing not found"));
        }
        res.status(200).json(listing);
    } catch (error) {
        next(error);
    }
};

export const updateListing = async (req, res, next) => {
    try {
        const updatedListing = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedListing) {
            return next(errorHandler(404, "Listing not found"));
        }
        res.status(200).json(updatedListing);
    } catch (error) {
        next(error);
    }
};

export const deleteListing = async (req, res, next) => {
    try {
        const deletedListing = await Listing.findByIdAndDelete(req.params.id);
        if (!deletedListing) {
            return next(errorHandler(404, "Listing not found"));
        }
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

export const getAllListings = async (req, res, next) => {
    try {
        const listings = await Listing.find();
        res.status(200).json(listings);
    } catch (error) {
        next(error);
    }
};