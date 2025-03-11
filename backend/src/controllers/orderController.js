// controllers/orderController.js

const Order = require('../models/Order');
const Product = require('../models/Product');

// Create a new order
const createOrder = async (req, res) => {
    try {
        const { products } = req.body;
        const userId = req.user.id;

        if (!products || products.length === 0) {
            return res.status(400).json({ message: 'No products in order' });
        }

        let total = 0;
        const orderItems = [];

        for (const item of products) {
            const product = await Product.findById(item.product);
            if (!product) {
                return res.status(404).json({ message: `Product not found: ${item.product}` });
            }
            if (product.stock < item.quantity) {
                return res.status(400).json({ message: `Not enough stock for product: ${product.name}` });
            }

            total += product.price * item.quantity;
            orderItems.push({ product: product._id, quantity: item.quantity });

            // Reduce stock
            product.stock -= item.quantity;
            await product.save();
        }

        const order = new Order({
            user: userId,
            products: orderItems,
            total,
        });

        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get all orders for a user
const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).populate('products.product', 'name price');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get order by ID
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('products.product', 'name price');
        if (!order) return res.status(404).json({ message: 'Order not found' });

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Admin: Get all orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('user', 'name email').populate('products.product', 'name price');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Admin: Update order status
const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params.id);

        if (!order) return res.status(404).json({ message: 'Order not found' });

        order.status = status;
        await order.save();

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = { createOrder, getUserOrders, getOrderById, getAllOrders, updateOrderStatus };
