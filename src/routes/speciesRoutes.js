import express from 'express';
import { speciesController } from '../controllers/speciesController.js';

const router = express.Router();

router.get('/', speciesController.getAll);
router.get('/:id', speciesController.getById);
router.post('/', speciesController.create);
router.put('/:id', speciesController.update);
router.delete('/:id', speciesController.delete);

export default router;
