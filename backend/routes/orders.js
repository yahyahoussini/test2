const express = require('express');
const router = express.Router();
const crypto = require('crypto');

// Mock database for orders - will be populated by index.js
let mockOrders = [];

// POST /api/orders - Create a new order
router.post('/orders', async (req, res) => {
  try {
    const { customer_name, customer_city, customer_address, customer_phone, items, total_price } = req.body;

    // Basic validation
    if (!customer_name || !customer_address || !customer_phone || !items || !total_price) {
      return res.status(400).json({ message: 'Veuillez remplir tous les champs requis.' });
    }

    const tracking_number = crypto.randomBytes(8).toString('hex').toUpperCase();

    const newOrder = {
      id: mockOrders.length + 1,
      customer_name,
      customer_city,
      customer_address,
      customer_phone,
      items,
      total_price,
      status: 'Pending',
      tracking_number,
      created_at: new Date().toISOString(),
    };

    mockOrders.push(newOrder);

    // In a real app, we would save to the database here.

    res.status(201).json({
      message: 'Commande passée avec succès!',
      tracking_number: newOrder.tracking_number
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// This route is for the public tracking page
// GET /api/track/:trackingNumber - Get order status by tracking number
router.get('/track/:trackingNumber', async (req, res) => {
  try {
    const { trackingNumber } = req.params;
    const order = mockOrders.find(o => o.tracking_number === trackingNumber);

    if (!order) {
      return res.status(404).json({ message: 'Aucune commande trouvée avec ce numéro.' });
    }

    // Return only public-safe information
    res.json({
      tracking_number: order.tracking_number,
      status: order.status,
      created_at: order.created_at,
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// This is a bit of a hack to share mock data between route files.
router.mockOrders = mockOrders;
module.exports = router;
