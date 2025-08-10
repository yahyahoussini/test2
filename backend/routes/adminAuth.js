const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// This should be in a .env file
const JWT_SECRET = process.env.JWT_SECRET || 'a-very-secret-key';

// Mock admin user - in a real app, this comes from the `admins` table
const mockAdmin = {
  id: 1,
  email: 'admin@maboutique.com',
  // Password is "password123"
  password_hash: '$2a$10$f.5sA2gC4fO3J8L9k2B7nO/ExV.7.r9mY8c4N3E2gH6pX7sI5d8eO',
};

// POST /api/admin/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  // In a real app: find user in DB
  if (email !== mockAdmin.email) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const isMatch = await bcrypt.compare(password, mockAdmin.password_hash);

  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: mockAdmin.id }, JWT_SECRET, { expiresIn: '1h' });

  res.json({ token });
});

module.exports = router;
