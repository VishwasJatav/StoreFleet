// controllers/authController.js

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const generateToken = require('../utils/generateToken');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Register a new user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log("Received signup request for:", email);

        let user = await User.findOne({ email });
        if (user) {
            console.log("User already exists:", email);
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({ name, email, password: hashedPassword });
        await user.save();

        const token = generateToken(user._id);
        res.status(201).json({ token, user: { id: user._id, name, email, role: user.role } });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

// Login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        // Generate JWT token
        const token = generateToken(user._id);

        res.json({ token, user: { id: user._id, name: user.name, email, role: user.role } });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Google Login
const loginWithGoogle = async (req, res) => {
    try {
        const { token } = req.body;

        // Verify Google Token
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const { email, name, picture, sub } = ticket.getPayload();

        // Check if user exists, otherwise create a new user
        let user = await User.findOne({ email });

        if (!user) {
            user = new User({ name, email, avatar: picture, googleId: sub });
            await user.save();
        }

        // Generate JWT Token
        const jwtToken = generateToken(user._id);

        res.json({ token: jwtToken, user });
    } catch (error) {
        res.status(400).json({ message: 'Google login failed', error });
    }
};

// Get authenticated user details
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = { registerUser, loginUser, loginWithGoogle, getUserProfile };
