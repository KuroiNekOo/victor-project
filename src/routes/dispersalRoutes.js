import express from 'express';
import { dispersalController } from '../controllers/dispersalController.js';

const router = express.Router();

router.get('/', dispersalController.getAll);
router.get('/by-bibliography-species', dispersalController.getByBibliographySpecies); // Doit être avant /:id
router.get('/:id', dispersalController.getById);
router.post('/', dispersalController.create);
router.put('/:id', dispersalController.update);
router.delete('/:id', dispersalController.delete);

export default router;
