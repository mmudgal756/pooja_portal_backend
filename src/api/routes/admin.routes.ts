
import { Router } from 'express';
import { makeAdmin } from '../controllers/admin.controller';
import { auth } from '../middleware/auth.middleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin management
 */

/**
 * @swagger
 * /api/admin/make-admin/{id}:
 *   put:
 *     summary: Make a user an admin
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: User is now an admin
 *       403:
 *         description: Forbidden
 *       404:
 *         description: User not found
 */
router.put('/make-admin/:id', auth(['Admin']), makeAdmin);

export default router;
