import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js'; // Assuming you have an error handler utility

export const protect = (req, res, next) => {
    let token;

    // Check for token in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(errorHandler(401, 'Not authorized, no token'));
    }

    try {
        // Verify token and get user info
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your secret key
        req.user = decoded; // Attach user info to request
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return next(errorHandler(401, 'Not authorized, token failed'));
    }
};