const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/blog - Get all blog posts
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT id, title, slug, content, created_at FROM blog_posts ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// GET /api/blog/:slug - Get a single blog post by slug
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const { rows } = await db.query('SELECT * FROM blog_posts WHERE slug = $1', [slug]);
    const post = rows[0];
    if (!post) {
      return res.status(404).json({ message: 'Article non trouvé' });
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
