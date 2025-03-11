const express = require("express");
const { registerUser, loginUser, getUserProfile } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Register a new user
router.post("/register", registerUser);

// Login user (✅ Should be POST, NOT GET)
router.post("/login", loginUser);

// Get user profile (Protected)
router.get("/profile", protect, getUserProfile);

module.exports = router;
