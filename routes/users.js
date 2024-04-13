import express from 'express';

// Import required modules

// Create a new router instance
const router = express.Router();

// Define routes
router.get('/', (req, res) => {
  // Handle GET request for all users
  res.send('Get all users');
});

router.get('/:id', (req, res) => {
  // Handle GET request for a specific user
  const userId = req.params.id;
  res.send(`Get user with ID ${userId}`);
});

router.post('/', (req, res) => {
  // Handle POST request to create a new user
  const userData = req.body;
  res.send('Create a new user');
});

router.put('/:id', (req, res) => {
  // Handle PUT request to update a specific user
  const userId = req.params.id;
  const userData = req.body;
  res.send(`Update user with ID ${userId}`);
});

router.delete('/:id', (req, res) => {
  // Handle DELETE request to delete a specific user
  const userId = req.params.id;
  res.send(`Delete user with ID ${userId}`);
});

// Export the router
export default router;
