// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

// Middleware to verify user authentication
const protect = (req, res, next) => {
    let token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Access denied, no token provided' });
    }

    try {
        // Remove "Bearer " if present
        token = token.startsWith('Bearer ') ? token.slice(7, token.length).trimLeft() : token;

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

// Middleware to verify admin access
const admin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied, admin only' });
    }
    next();
};

module.exports = { protect, admin };
