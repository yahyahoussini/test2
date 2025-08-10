const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// Mock data from the public orders route - this should be a shared data store
// For now, we'll just assume we have access to it.
// A better implementation would have a service layer.
let mockOrders = []; // This will be populated by the public route

// All these routes are protected
router.use(authMiddleware);

// GET /api/admin/orders - Get all orders
router.get('/', (req, res) => {
  // In a real app, we'd fetch from the DB
  res.json(mockOrders);
});

// PATCH /api/admin/orders/:id/status - Update an order's status
router.patch('/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Canceled', 'Returned'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  const orderIndex = mockOrders.findIndex(o => o.id == id);
  if (orderIndex === -1) {
    return res.status(404).json({ message: 'Order not found' });
  }

  mockOrders[orderIndex].status = status;

  // Here's the special business logic for 'Returned'
  // We can't actually deduct from revenue here, but we can flag it.
  // The analytics endpoint will handle the calculation.
  console.log(`Order ${id} status updated to ${status}`);

  res.json(mockOrders[orderIndex]);
});

// This is a bit of a hack to share mock data between route files.
// In a real app, a database would be the single source of truth.
router.mockOrders = mockOrders;

module.exports = router;
