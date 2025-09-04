
import { Router } from 'express';
import * as anusthanController from '../controllers/anusthan.controller';

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
 *   post:
 *     summary: Create a new anusthan
 *     tags: [Anusthans]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Anusthan'
 *     responses:
 *       201:
 *         description: The anusthan was successfully created
 *       400:
 *         description: Bad request
 */
router.post('/', anusthanController.createAnusthan);

/**
 * @swagger
 * /api/anusthans:
 *   get:
 *     summary: Get all anusthans
 *     tags: [Anusthans]
 *     responses:
 *       200:
 *         description: A list of anusthans
 */
router.get('/', anusthanController.getAnusthans);

/**
 * @swagger
 * /api/anusthans/{id}:
 *   get:
 *     summary: Get an anusthan by ID
 *     tags: [Anusthans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the anusthan to retrieve
 *     responses:
 *       200:
 *         description: The anusthan
 *       404:
 *         description: Anusthan not found
 */
router.get('/:id', anusthanController.getAnusthan);

/**
 * @swagger
 * /api/anusthans/{id}:
 *   put:
 *     summary: Update an anusthan
 *     tags: [Anusthans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the anusthan to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Anusthan'
 *     responses:
 *       200:
 *         description: The anusthan was successfully updated
 *       404:
 *         description: Anusthan not found
 *       400:
 *         description: Bad request
 */
router.put('/:id', anusthanController.updateAnusthan);

/**
 * @swagger
 * /api/anusthans/{id}:
 *   delete:
 *     summary: Delete an anusthan
 *     tags: [Anusthans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the anusthan to delete
 *     responses:
 *       200:
 *         description: The anusthan was successfully deleted
 *       404:
 *         description: Anusthan not found
 */
router.delete('/:id', anusthanController.deleteAnusthan);

export default router;
