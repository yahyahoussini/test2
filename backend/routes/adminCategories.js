const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const db = require('../db');

router.use(authMiddleware);

// GET /api/admin/categories
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM categories ORDER BY name');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// POST /api/admin/categories
router.post('/', async (req, res) => {
  try {
    const { name, slug, seo_title, seo_description } = req.body;
    const { rows } = await db.query(
      'INSERT INTO categories (name, slug, seo_title, seo_description) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, slug, seo_title, seo_description]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// PUT /api/admin/categories/:id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, seo_title, seo_description } = req.body;
    const { rows } = await db.query(
      'UPDATE categories SET name = $1, slug = $2, seo_title = $3, seo_description = $4 WHERE id = $5 RETURNING *',
      [name, slug, seo_title, seo_description, id]
    );
    if (rows.length === 0) return res.status(404).json({ message: 'Category not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// DELETE /api/admin/categories/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('DELETE FROM categories WHERE id = $1', [id]);
    if (result.rowCount === 0) return res.status(404).json({ message: 'Category not found' });
    res.status(204).send();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
