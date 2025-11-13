import express from 'express';
import { numberAgeGroupController } from '../controllers/numberAgeGroupController.js';

const router = express.Router();

router.get('/', numberAgeGroupController.getAll);
router.get('/by-bibliography-species', numberAgeGroupController.getByBibliographySpecies); // Doit être avant /:id
router.get('/:id', numberAgeGroupController.getById);
router.post('/', numberAgeGroupController.create);
router.put('/:id', numberAgeGroupController.update);
router.delete('/:id', numberAgeGroupController.delete);

export default router;
