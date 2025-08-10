const express = require('express');
const router = express.Router();

// Mock data for blog posts
const mockBlogPosts = [
  {
    id: 1,
    title: 'Notre Lancement de Boutique',
    slug: 'notre-lancement-de-boutique',
    content: 'Nous sommes ravis de vous annoncer le lancement de notre nouvelle boutique en ligne!',
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'Top 5 des Produits de la Saison',
    slug: 'top-5-produits-saison',
    content: 'Découvrez notre sélection des meilleurs produits pour cette saison.',
    created_at: new Date().toISOString(),
  },
];

// GET /api/blog - Get all blog posts
router.get('/', async (req, res) => {
  try {
    res.json(mockBlogPosts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// GET /api/blog/:slug - Get a single blog post by slug
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const post = mockBlogPosts.find(p => p.slug === slug);

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
