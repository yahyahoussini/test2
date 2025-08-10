const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const db = require('../db');

router.use(authMiddleware);

router.get('/analytics', async (req, res) => {
  try {
    // 1. Calculate Actual and Potential Revenue, and Order Counts
    const revenueQuery = `
      SELECT
        COALESCE(SUM(CASE WHEN status = 'Delivered' THEN total_price ELSE 0 END), 0) as "actualRevenue",
        COALESCE(SUM(CASE WHEN status = 'Returned' THEN 45 ELSE 0 END), 0) as "returnedFees",
        COALESCE(SUM(CASE WHEN status IN ('Confirmed', 'Shipped') THEN total_price ELSE 0 END), 0) as "potentialRevenue",
        json_object_agg(status, count) as "orderCounts"
      FROM (
        SELECT status, COUNT(*) as count
        FROM orders
        GROUP BY status
      ) as status_counts;
    `;
    const revenueRes = await db.query(revenueQuery);
    const { actualRevenue, returnedFees, potentialRevenue, orderCounts } = revenueRes.rows[0];
    const finalActualRevenue = parseFloat(actualRevenue) - parseFloat(returnedFees);

    // 2. Get Top Selling Products
    const topProductsQuery = `
      SELECT p.name, SUM(oi.quantity) as sales
      FROM order_items oi
      JOIN orders o ON o.id = oi.order_id
      JOIN products p ON p.id = oi.product_id
      WHERE o.status = 'Delivered'
      GROUP BY p.name
      ORDER BY sales DESC
      LIMIT 5;
    `;
    const topProductsRes = await db.query(topProductsQuery);

    const analyticsData = {
      actualRevenue: finalActualRevenue.toFixed(2),
      potentialRevenue: parseFloat(potentialRevenue).toFixed(2),
      orderCounts: orderCounts || {}, // Handle case with no orders
      topSellingProducts: topProductsRes.rows,
    };

    res.json(analyticsData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
