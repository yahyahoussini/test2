const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/analytics', (req, res) => {
  // Access the mock data passed from index.js
  const orders = router.mockOrders || [];
  const products = router.mockProducts || [];

  let actualRevenue = 0;
  let potentialRevenue = 0;
  const orderCounts = {
    Pending: 0, Confirmed: 0, Shipped: 0, Delivered: 0, Canceled: 0, Returned: 0
  };
  const productSales = {};

  for (const order of orders) {
    if (order.status && orderCounts.hasOwnProperty(order.status)) {
        orderCounts[order.status]++;
    }

    if (order.status === 'Delivered') {
      actualRevenue += parseFloat(order.total_price);
      // Track sales for delivered items
      order.items.forEach(item => {
        productSales[item.product.id] = (productSales[item.product.id] || 0) + item.quantity;
      });
    } else if (order.status === 'Returned') {
      actualRevenue -= 45; // The 45dh fee
    } else if (order.status === 'Confirmed' || order.status === 'Shipped') {
      potentialRevenue += parseFloat(order.total_price);
    }
  }

  const topSellingProducts = Object.entries(productSales)
    .sort(([, salesA], [, salesB]) => salesB - salesA)
    .slice(0, 5) // Top 5 products
    .map(([productId, sales]) => {
      const product = products.find(p => p.id == productId);
      return {
        name: product ? product.name : `Product ID ${productId}`,
        sales,
      };
    });

  const analyticsData = {
    actualRevenue: actualRevenue.toFixed(2),
    potentialRevenue: potentialRevenue.toFixed(2),
    orderCounts,
    topSellingProducts,
  };

  res.json(analyticsData);
});

// Properties to hold the shared mock data
router.mockOrders = [];
router.mockProducts = [];

module.exports = router;
