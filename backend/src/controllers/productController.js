// controllers/productController.js

const Product = require('../models/Product');

// Create a new product (Admin only)
const createProduct = async (req, res) => {
    try {
        const { name, price, description, stock } = req.body;

        const product = new Product({ name, price, description, stock });
        await product.save();

        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get product by ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update a product (Admin only)
const updateProduct = async (req, res) => {
    try {
        const { name, price, description, stock } = req.body;
        let product = await Product.findById(req.params.id);

        if (!product) return res.status(404).json({ message: 'Product not found' });

        product.name = name || product.name;
        product.price = price || product.price;
        product.description = description || product.description;
        product.stock = stock || product.stock;

        await product.save();
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete a product (Admin only)
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        await product.remove();
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct };
