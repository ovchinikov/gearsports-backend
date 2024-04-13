import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../model/users.js';

const router = express.Router();

// POST /login
router.post('/', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const passwordCorrect = await bcrypt.compare(password, user.password);

  if (!passwordCorrect) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const userForToken = {
    email: user.email,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  res.status(200).send({
    token,
    email: user.email,
    firstname: user.firstname,
    lastname: user.lastname,
    role: user.role,
  });
});

export default router;
