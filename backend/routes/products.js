const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/products - Get all products
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM products WHERE stock > 0 ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// GET /api/products/:slug - Get a single product by slug
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const { rows } = await db.query('SELECT * FROM products WHERE slug = $1', [slug]);
    const product = rows[0];

    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
