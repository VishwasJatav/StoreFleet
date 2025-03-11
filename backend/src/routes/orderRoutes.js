// routes/orderRoutes.js

const express = require('express');
const {
    createOrder,
    getUserOrders,
    getOrderById,
    getAllOrders,
    updateOrderStatus
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Create a new order (Protected route)
router.post('/', protect, createOrder);

// Get all orders for the logged-in user (Protected route)
router.get('/my-orders', protect, getUserOrders);

// Get order by ID (Protected route)
router.get('/:id', protect, getOrderById);

// Admin: Get all orders (Admin only)
router.get('/', protect, admin, getAllOrders);

// Admin: Update order status (Admin only)
router.put('/:id', protect, admin, updateOrderStatus);

module.exports = router;
