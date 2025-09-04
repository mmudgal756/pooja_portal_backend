
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './api/routes/user.routes';
import categoryRoutes from './api/routes/category.routes';
import productRoutes from './api/routes/product.routes';
import adminRoutes from './api/routes/admin.routes';
import anusthanRoutes from './api/routes/anusthan.routes';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';

dotenv.config();

const app = express();

// Use the cors middleware with specific origin
app.use(cors({
  origin: 'http://localhost:5173'
}));

// Middleware
app.use(express.json());

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', adminRoutes);
app.use('/api', anusthanRoutes);

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
