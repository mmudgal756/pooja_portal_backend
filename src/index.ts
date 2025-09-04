
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './api/routes/user.routes';
import categoryRoutes from './api/routes/category.routes';
import productRoutes from './api/routes/product.routes';
import adminRoutes from './api/routes/admin.routes';

dotenv.config();

const app = express();

// Use the cors middleware with specific origin
app.use(cors({
  origin: 'http://localhost:5173'
}));

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);

const port = parseInt(process.env.PORT || '3000');

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/test');
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection failed.', err);
    process.exit(1);
  }

  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
};

start();
