import { Router } from 'express';
import {
  getAnusthans,
  getAnusthan,
  createAnusthan,
  updateAnusthan,
  deleteAnusthan,
} from '../controllers/anusthan.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Anusthans
 *   description: Anusthan management
 */

/**
 * @swagger
 * /api/anusthans:
 *   get:
 *     summary: Returns the list of all the anusthans
 *     tags: [Anusthans]
 *     responses:
 *       200:
 *         description: The list of the anusthans
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Anusthan'
 */
router.get('/', getAnusthans);

/**
 * @swagger
 * /api/anusthans/{id}:
 *   get:
 *     summary: Get the anusthan by id
 *     tags: [Anusthans]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The anusthan id
 *     responses:
 *       200:
 *         description: The anusthan description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Anusthan'
 *       404:
 *         description: The anusthan was not found
 */
router.get('/:id', getAnusthan);

/**
 * @swagger
 * /api/anusthans:
 *   post:
 *     summary: Create a new anusthan
 *     tags: [Anusthans]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *             example:
 *               name: Gandharva Vivah
 *               description: A celestial marriage ceremony.
 *               price: 21000
 *     responses:
 *       201:
 *         description: The anusthan was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Anusthan'
 *       400:
 *         description: Some server error
 */
router.post('/', createAnusthan);

/**
 * @swagger
 * /api/anusthans/{id}:
 *   put:
 *     summary: Update the anusthan by the id
 *     tags: [Anusthans]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The anusthan id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: The anusthan was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Anusthan'
 *       404:
 *         description: The anusthan was not found
 *       400:
 *         description: Some server error
 */
router.put('/:id', updateAnusthan);

/**
 * @swagger
 * /api/anusthans/{id}:
 *   delete:
 *     summary: Remove the anusthan by id
 *     tags: [Anusthans]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The anusthan id
 *
 *     responses:
 *       200:
 *         description: The anusthan was deleted
 *       404:
 *         description: The anusthan was not found
 */
router.delete('/:id', deleteAnusthan);

export default router;
