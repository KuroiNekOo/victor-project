import express from 'express';
import { ageGroupController } from '../controllers/ageGroupController.js';

const router = express.Router();

router.get('/', ageGroupController.getAll);
router.get('/by-bibliography-species', ageGroupController.getByBibliographySpecies); // Doit être avant /:id
router.get('/:id', ageGroupController.getById);
router.post('/', ageGroupController.create);
router.put('/:id', ageGroupController.update);
router.delete('/:id', ageGroupController.delete);

export default router;
