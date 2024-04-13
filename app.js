import express from 'express';
import cors from 'cors';
import categoriesRouter from './routes/categories.js';
import productsRouter from './routes/products.js';
import loginRouter from './routes/login.js';
import signUpRouter from './routes/registration.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/categories', categoriesRouter);
app.use('/api/products', productsRouter);
app.use('/api/signup', signUpRouter);
app.use('/api/login', loginRouter);
export default app;
