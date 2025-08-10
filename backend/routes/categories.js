const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/categories - Get all categories
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM categories ORDER BY name');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
