
import { Router } from 'express';
import {
  createProduct,
  getProducts,
  getProductById,
  getProductsByCategory, // Import the new function
  updateProduct,
  deleteProduct
} from '../controllers/product.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management
 */

// POST /api/products - Create a new product
router.post('/', createProduct);

// GET /api/products - Get all products
router.get('/', getProducts);

/**
 * @swagger
 * /api/products/category/{categoryName}:
 *   get:
 *     summary: Get products by category name
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: categoryName
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of products for the given category
 *       404:
 *         description: Category not found
 *       500:
 *         description: Server error
 */
router.get('/category/:categoryName', getProductsByCategory);

// GET /api/products/:id - Get a product by ID
router.get('/:id', getProductById);

// PUT /api/products/:id - Update a product
router.put('/:id', updateProduct);

// DELETE /api/products/:id - Delete a product
router.delete('/:id', deleteProduct);

export default router;
