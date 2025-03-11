const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./src/config/db");

dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());

// ✅ Allow CORS (Frontend URL should be allowed)
const allowedOrigins = [process.env.FRONTEND_URL || "http://localhost:5173"];
app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,
    })
);

// ✅ Connect to MongoDB with Error Handling
const startServer = async () => {
    try {
        await connectDB();
        console.log("✅ MongoDB Connected Successfully");
    } catch (error) {
        console.error("❌ MongoDB Connection Failed:", error);
        process.exit(1); // Stop server if DB fails
    }
};

// Import Routes
const authRoutes = require("./src/routes/authRoutes");
const productRoutes = require("./src/routes/productRoutes");
const orderRoutes = require("./src/routes/orderRoutes");

// Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// ✅ Test API Route
app.get("/", (req, res) => {
    res.send("✅ API is running...");
});

// ✅ Handle Undefined Routes
app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
});

// Start Server
const PORT = process.env.PORT || 5001;
startServer().then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
