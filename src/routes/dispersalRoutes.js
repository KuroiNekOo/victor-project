import express from 'express';
import { dispersalController } from '../controllers/dispersalController.js';

const router = express.Router();

router.get('/', dispersalController.getAll);
router.get('/:id', dispersalController.getById);
router.get('/species/:speciesId', dispersalController.getBySpeciesId);
router.post('/', dispersalController.create);
router.put('/:id', dispersalController.update);
router.delete('/:id', dispersalController.delete);

export default router;
