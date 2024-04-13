import express from 'express';
import Product from '../model/product.js';
import Category from '../model/categories.js';
import cloudinary from '../config/cloudinary.js';
import upload from '../config/multer.js';
import fs from 'fs';
const router = express.Router();

// GET /products
router.get('/', async (req, res) => {
  const products = await Product.find();
  return res.status(200).json({
    products,
  });
});

// GET /products/:id
router.get('/:id', (req, res) => {
  // Logic to fetch a specific product by ID from the database
  // and send the response
});

// POST /products
router.post('/', upload.array('files', 10), async (req, res) => {
  const { name, description, price, category } = req.body;

  const categoryExists = await Category.findOne({ name: category });
  if (!categoryExists) {
    return res.status(400).send('Category does not exist');
  }

  const uploader = async (path) => await cloudinary.uploads(path, 'Images');

  if (req.files.length <= 0) {
    return res.status(400).send('Please upload an image');
  }

  try {
    const urls = [];
    const files = req.files;
    console.log(files);
    for (const file of files) {
      const { path } = file;
      console.log('file', path);
      const newPath = await uploader(path);
      urls.push(newPath);
      fs.unlinkSync(path);
    }

    console.log(urls);

    const product = new Product({
      name,
      description,
      price,
      category: categoryExists._id,
      files: urls,
    });

    await product.save();

    return res.status(201).json({
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send('Image upload failed');
  }
});

// PUT /products/:id
router.put('/:id', upload.array('files', 10), (req, res) => {
  // Logic to update a specific product by ID in the database
  // using the data from the request body
  // and send the response
});

// DELETE /products/:id
router.delete('/:id', (req, res) => {
  // Logic to delete a specific product by ID from the database
  // and send the response
});

export default router;
