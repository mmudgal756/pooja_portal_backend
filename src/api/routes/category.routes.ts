
import { Router } from 'express';
import { createCategory, getCategories, deleteCategoryByName } from '../controllers/category.controller';
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
 *     summary: Create a new category (Public)
 *     tags: [Categories]
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
 *                 enum: [Products, Anusthans]
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Bad request (e.g., name is not 'Products' or 'Anusthans')
 */
router.post('/', createCategory); // Removed auth middleware

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

/**
 * @swagger
 * /api/categories/{categoryName}:
 *   delete:
 *     summary: Delete a category by name
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: categoryName
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category removed
 *       404:
 *         description: Category not found
 *       500:
 *         description: Server error
 */
router.delete('/:categoryName', deleteCategoryByName);

export default router;
