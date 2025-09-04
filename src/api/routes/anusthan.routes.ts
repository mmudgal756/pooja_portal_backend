import { Router } from 'express';
import * as anusthanController from '../controllers/anusthan.controller';

const router = Router();

router.post('/', anusthanController.createAnusthan);
router.get('/', anusthanController.getAnusthans);
router.get('/:id', anusthanController.getAnusthan);
router.put('/:id', anusthanController.updateAnusthan);
router.delete('/:id', anusthanController.deleteAnusthan);

export default router;
