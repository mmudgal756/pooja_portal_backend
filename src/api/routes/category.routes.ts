
import { Router } from 'express';
import { createCategory, getCategories } from '../controllers/category.controller';
import { auth } from '../middleware/auth.middleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Category management
 */

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 enum: [Products, Anuthans]  // Updated Swagger docs
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Bad request (e.g., name is not 'Products' or 'Anuthans')
 *       401:
 *         description: Unauthorized
 */
router.post('/', auth(['Admin']), createCategory);

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: A list of categories
 *       500:
 *         description: Server error
 */
router.get('/', getCategories);

export default router;
