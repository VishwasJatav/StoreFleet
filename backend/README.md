backend/
│── node_modules/
│── src/
│   │── config/
│   │   ├── db.js              # Database connection
│   │── controllers/
│   │   ├── authController.js  # User authentication logic
│   │   ├── productController.js # Product CRUD logic
│   │   ├── orderController.js # Order handling logic
│   │── models/
│   │   ├── User.js            # User model
│   │   ├── Product.js         # Product model
│   │   ├── Order.js           # Order model
│   │── routes/
│   │   ├── authRoutes.js      # Authentication routes
│   │   ├── productRoutes.js   # Product routes
│   │   ├── orderRoutes.js     # Order routes
│   │── middleware/
│   │   ├── authMiddleware.js  # JWT authentication middleware
│   │── utils/
│   │   ├── generateToken.js   # Function to generate JWT tokens
│   │── server.js              # Main entry point
│── .env                        # Environment variables (DB_URI, JWT_SECRET)
│── package.json                 # Dependencies and scripts
│── README.md                    # Documentation
