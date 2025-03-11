// routes/productRoutes.js

const express = require('express');
const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Get all products (Public route)
router.get('/', getAllProducts);

// Get a single product by ID (Public route)
router.get('/:id', getProductById);

// Create a new product (Admin only)
router.post('/', protect, admin, createProduct);

// Update a product by ID (Admin only)
router.put('/:id', protect, admin, updateProduct);

// Delete a product by ID (Admin only)
router.delete('/:id', protect, admin, deleteProduct);

module.exports = router;
