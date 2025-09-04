
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
// import swaggerUi from 'swagger-ui-express';
// import swaggerSpec from './config/swagger';
import userRoutes from './api/routes/user.routes';
import categoryRoutes from './api/routes/category.routes';
import productRoutes from './api/routes/product.routes';
import adminRoutes from './api/routes/admin.routes';
import { User } from './models/user.model';

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

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/test');
    console.log('Connected to MongoDB');

    // Create a default admin user if one doesn't exist
    const admin = await User.findOne({ role: 'Admin' });
    if (!admin) {
      const newAdmin = new User({
        name: 'Admin',
        email: 'admin@example.com',
        password: 'admin123',
        role: 'Admin'
      });
      await newAdmin.save();
      console.log('Default admin user created');
    }

    // Create a default vendor user if one doesn't exist
    const vendor = await User.findOne({ role: 'Vendor' });
    if (!vendor) {
      const newVendor = new User({
        name: 'Vendor',
        email: 'vendor@example.com',
        password: 'vendor123',
        role: 'Vendor'
      });
      await newVendor.save();
      console.log('Default vendor user created');
    }

    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  } catch (err) {
    console.error(err);
  }
};

start();
