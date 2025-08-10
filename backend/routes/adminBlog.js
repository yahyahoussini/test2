const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const db = require('../db');

router.use(authMiddleware);

// GET /api/admin/blog
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM blog_posts ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// POST /api/admin/blog
router.post('/', async (req, res) => {
  try {
    const { title, slug, content, seo_title, seo_description } = req.body;
    const { rows } = await db.query(
      'INSERT INTO blog_posts (title, slug, content, seo_title, seo_description) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, slug, content, seo_title, seo_description]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// PUT /api/admin/blog/:id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, slug, content, seo_title, seo_description } = req.body;
    const { rows } = await db.query(
      'UPDATE blog_posts SET title = $1, slug = $2, content = $3, seo_title = $4, seo_description = $5, updated_at = NOW() WHERE id = $6 RETURNING *',
      [title, slug, content, seo_title, seo_description, id]
    );
    if (rows.length === 0) return res.status(404).json({ message: 'Blog post not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// DELETE /api/admin/blog/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('DELETE FROM blog_posts WHERE id = $1', [id]);
    if (result.rowCount === 0) return res.status(404).json({ message: 'Blog post not found' });
    res.status(204).send();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
