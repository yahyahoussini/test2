const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// Mock data - in a real app, this would interact with the database
let mockProducts = [
  { id: 1, name: 'Produit Fantastique', slug: 'produit-fantastique', price: '99.99', stock: 15 },
  { id: 2, name: 'Article Incroyable', slug: 'article-incroyable', price: '49.50', stock: 30 },
];

// All these routes are protected
router.use(authMiddleware);

// GET /api/admin/products - Get all products for admin view
router.get('/', (req, res) => {
  res.json(mockProducts);
});

// POST /api/admin/products - Create a new product
router.post('/', (req, res) => {
  const { name, price, stock, description, slug } = req.body;
  const newProduct = {
    id: mockProducts.length + 1,
    name, price, stock, description, slug
  };
  mockProducts.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT /api/admin/products/:id - Update a product
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, price, stock, description, slug } = req.body;
  const productIndex = mockProducts.findIndex(p => p.id == id);
  if (productIndex === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }
  const updatedProduct = { ...mockProducts[productIndex], name, price, stock, description, slug };
  mockProducts[productIndex] = updatedProduct;
  res.json(updatedProduct);
});

// DELETE /api/admin/products/:id - Delete a product
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const productIndex = mockProducts.findIndex(p => p.id == id);
  if (productIndex === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }
  mockProducts.splice(productIndex, 1);
  res.status(204).send();
});

router.mockProducts = mockProducts;
module.exports = router;
