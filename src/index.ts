
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
// import swaggerUi from 'swagger-ui-express';
// import swaggerSpec from './config/swagger';
import userRoutes from './api/routes/user.routes';
import categoryRoutes from './api/routes/category.routes';
import productRoutes from './api/routes/product.routes';
import adminRoutes from './api/routes/admin.routes';

dotenv.config();

const app = express();

// A custom middleware to handle CORS
app.use((req, res, next) => {
  // Set the origin to allow your React app
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  // Set the allowed HTTP methods
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  // Set the allowed headers, including Content-Type and Authorization
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle the preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);

// Swagger
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const port = parseInt(process.env.PORT || '3000');

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const start = async () => {
  let connectionRetries = 5;
  while (connectionRetries > 0) {
    try {
      await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/test');
      console.log('Connected to MongoDB');
      break; // If connection is successful, break the loop
    } catch (err) {
      console.error('MongoDB connection failed. Retrying...');
      connectionRetries--;
      if (connectionRetries === 0) {
        console.error('Could not connect to MongoDB after multiple retries. Exiting.');
        process.exit(1); // Exit if all retries fail
      }
      await sleep(5000); // Wait for 5 seconds before retrying
    }
  }

  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
};

start();
