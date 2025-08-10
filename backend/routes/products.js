const express = require('express');
const router = express.Router();
// const db = require('../db'); // In a real scenario, we'd use this.

// Mock data simulating a database response.
const mockProducts = [
  {
    id: 1,
    name: 'Produit Fantastique',
    slug: 'produit-fantastique',
    description: 'Une description merveilleuse de ce produit.',
    price: '99.99',
    stock: 15,
    images: ['/images/product1.jpg'],
  },
  {
    id: 2,
    name: 'Article Incroyable',
    slug: 'article-incroyable',
    description: 'Cet article changera votre vie.',
    price: '49.50',
    stock: 30,
    images: ['/images/product2.jpg'],
  },
];


// GET /api/products - Get all products
router.get('/', async (req, res) => {
  try {
    // In a real implementation, this would be:
    // const { rows } = await db.query('SELECT * FROM products WHERE stock > 0');
    // res.json(rows);

    // For now, return mock data
    res.json(mockProducts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// GET /api/products/:slug - Get a single product by slug
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    // In a real implementation:
    // const { rows } = await db.query('SELECT * FROM products WHERE slug = $1', [slug]);
    // const product = rows[0];

    // Simulate with mock data
    const product = mockProducts.find(p => p.slug === slug);

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
