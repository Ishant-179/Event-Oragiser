// middleware/authMiddleware.js (Corrected)
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // Protect middleware में user को find कर req.user में डाल दिया गया है
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }
    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
});

const admin = (req, res, next) => {
    // यह जांच करें कि यूजर का role 'admin' है या नहीं
    if (req.user && req.user.role === 'admin') { 
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as an admin' });
    }
};

module.exports = { protect, admin };