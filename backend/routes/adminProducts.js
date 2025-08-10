const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const db = require('../db');

// All these routes are protected
router.use(authMiddleware);

// GET /api/admin/products - Get all products for admin view
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM products ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// POST /api/admin/products - Create a new product
router.post('/', async (req, res) => {
  try {
    const { name, slug, description, price, stock, images, seo_title, seo_description } = req.body;
    const { rows } = await db.query(
      'INSERT INTO products (name, slug, description, price, stock, images, seo_title, seo_description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [name, slug, description, price, stock, images, seo_title, seo_description]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// PUT /api/admin/products/:id - Update a product
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, description, price, stock, images, seo_title, seo_description } = req.body;
    const { rows } = await db.query(
      'UPDATE products SET name = $1, slug = $2, description = $3, price = $4, stock = $5, images = $6, seo_title = $7, seo_description = $8, updated_at = NOW() WHERE id = $9 RETURNING *',
      [name, slug, description, price, stock, images, seo_title, seo_description, id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// DELETE /api/admin/products/:id - Delete a product
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('DELETE FROM products WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(204).send();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
