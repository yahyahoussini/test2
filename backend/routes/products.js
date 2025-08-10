const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/products - Get all products with filtering
router.get('/', async (req, res) => {
  try {
    let query = 'SELECT p.* FROM products p';
    const values = [];
    const whereClauses = [];

    const { category, search, minPrice, maxPrice } = req.query;

    if (category) {
      // Assuming 'category' is a slug. This requires a join.
      query += ' JOIN product_categories pc ON p.id = pc.product_id JOIN categories c ON c.id = pc.category_id';
      values.push(category);
      whereClauses.push(`c.slug = $${values.length}`);
    }

    if (search) {
      values.push(`%${search}%`);
      whereClauses.push(`p.name ILIKE $${values.length}`);
    }

    if (minPrice) {
      values.push(minPrice);
      whereClauses.push(`p.price >= $${values.length}`);
    }

    if (maxPrice) {
      values.push(maxPrice);
      whereClauses.push(`p.price <= $${values.length}`);
    }

    if (whereClauses.length > 0) {
      query += ' WHERE ' + whereClauses.join(' AND ');
    }

    query += ' ORDER BY p.created_at DESC';

    const { rows } = await db.query(query, values);
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
