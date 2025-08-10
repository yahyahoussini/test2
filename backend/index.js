const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware to parse JSON bodies
app.use(express.json());

// Import routes
const productRoutes = require('./routes/products');
const categoryRoutes = require('./routes/categories');
const blogRoutes = require('./routes/blog');
const orderRoutes = require('./routes/orders');
const adminAuthRoutes = require('./routes/adminAuth');
const adminProductRoutes = require('./routes/adminProducts');
const adminOrderRoutes = require('./routes/adminOrders');
const adminAnalyticsRoutes = require('./routes/adminAnalytics');

// A hack to share the mock data arrays between routes
orderRoutes.mockOrders = adminOrderRoutes.mockOrders;
adminAnalyticsRoutes.mockOrders = adminOrderRoutes.mockOrders;
adminAnalyticsRoutes.mockProducts = adminProductRoutes.mockProducts;

// Use routes
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api', orderRoutes); // Using /api as base for /orders and /track

// Admin routes
app.use('/api/admin', adminAuthRoutes);
app.use('/api/admin/products', adminProductRoutes);
app.use('/api/admin/orders', adminOrderRoutes);
app.use('/api/admin', adminAnalyticsRoutes);

app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the E-commerce API' });
});

app.listen(port, () => {
  console.log(`Backend server listening on port ${port}`);
});
