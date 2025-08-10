const express = require('express');
const router = express.Router();

// Mock data for categories
const mockCategories = [
  { id: 1, name: 'Électronique', slug: 'electronique' },
  { id: 2, name: 'Vêtements', slug: 'vetements' },
  { id: 3, name: 'Maison et Jardin', slug: 'maison-et-jardin' },
];

// GET /api/categories - Get all categories
router.get('/', async (req, res) => {
  try {
    // Real implementation would query the database
    res.json(mockCategories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
