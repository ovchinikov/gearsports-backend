import express from 'express';
import Joi from 'joi';
import Category from '../model/categories.js';
const router = express.Router();
import upload from '../config/multer.js';

const schema = Joi.object({
  name: Joi.string().required(),
});

// Define your category routes
router.get('/', (req, res) => {
  // Handle GET request for all categories
  res.send('Get all categories');
});

router.get('/:id', (req, res) => {
  // Handle GET request for a specific category by ID
  const categoryId = req.params.id;
  res.send(`Get category with ID ${categoryId}`);
});

router.post('/', upload.array('files', 10), async (req, res) => {
  const category = new Category({
    name: req.body.name,
  });

  await category.save();
  res.send(category);
});

router.put('/:id', upload.array('files', 10), (req, res) => {
  // Handle PUT request to update a category by ID
  const categoryId = req.params.id;
  const categoryData = req.body;
  res.send(`Update category with ID ${categoryId}`);
});

router.delete('/:id', (req, res) => {
  // Handle DELETE request to delete a category by ID
  const categoryId = req.params.id;
  res.send(`Delete category with ID ${categoryId}`);
});

// Export the router
export default router;
