import express from 'express';
import bcrypt from 'bcrypt';
import User from '../model/users.js';

const router = express.Router();

// POST /signup
router.post('/', async (req, res) => {
  const { email, password, address, role, firstname, lastname } = req.body;
  const hash = bcrypt.hashSync(password, 10);
  const user = new User({
    email,
    password: hash,
    address,
    role,
    firstname,
    lastname,
  });
  await user.save();

  res.status(201).json(user);
});

export default router;
