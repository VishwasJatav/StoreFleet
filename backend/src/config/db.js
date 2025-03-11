// config/db.js

const mongoose = require('mongoose');

// Suppress punycode deprecation warning
process.removeAllListeners('warning');
process.on('warning', (warning) => {
    if (warning.name === 'DeprecationWarning' && warning.message.includes('punycode')) {
        return;
    }
    console.warn(warning.name, warning.message);
});

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected successfully to ${conn.connection.host}`);
        
        // Handle connection events
        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
        });

        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            process.exit(0);
        });

    } catch (err) {
        console.error('MongoDB connection failed:', err);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;