const express = require('express');
const router = express.Router();
const db = require('../db');
const crypto = require('crypto');

// POST /api/orders - Create a new order
router.post('/orders', async (req, res) => {
  const { customer_name, customer_city, customer_address, customer_phone, items, total_price } = req.body;

  // Basic validation
  if (!customer_name || !customer_address || !customer_phone || !items || !items.length || !total_price) {
    return res.status(400).json({ message: 'Veuillez remplir tous les champs requis.' });
  }

  const client = await db.getClient(); // Use a client for transactions
  try {
    await client.query('BEGIN'); // Start transaction

    const tracking_number = crypto.randomBytes(8).toString('hex').toUpperCase();

    // Insert into orders table
    const orderQuery = 'INSERT INTO orders (customer_name, customer_city, customer_address, customer_phone, total_price, tracking_number) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id';
    const orderValues = [customer_name, customer_city, customer_address, customer_phone, total_price, tracking_number];
    const orderResult = await client.query(orderQuery, orderValues);
    const orderId = orderResult.rows[0].id;

    // Insert into order_items table for each item
    const itemInsertQuery = 'INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) VALUES ($1, $2, $3, $4)';
    for (const item of items) {
      const itemValues = [orderId, item.product.id, item.quantity, item.product.price];
      await client.query(itemInsertQuery, itemValues);
    }

    await client.query('COMMIT'); // Commit transaction

    res.status(201).json({
      message: 'Commande passée avec succès!',
      tracking_number: tracking_number
    });

  } catch (err) {
    await client.query('ROLLBACK'); // Rollback on error
    console.error(err.message);
    res.status(500).send('Server Error');
  } finally {
    client.release(); // Release client back to the pool
  }
});

// GET /api/track/:trackingNumber - Get order status by tracking number
router.get('/track/:trackingNumber', async (req, res) => {
  try {
    const { trackingNumber } = req.params;
    const { rows } = await db.query('SELECT tracking_number, status, created_at FROM orders WHERE tracking_number = $1', [trackingNumber]);
    const order = rows[0];

    if (!order) {
      return res.status(404).json({ message: 'Aucune commande trouvée avec ce numéro.' });
    }
    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
