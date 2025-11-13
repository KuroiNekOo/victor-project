import express from 'express';
import { numberAgeGroupController } from '../controllers/numberAgeGroupController.js';

const router = express.Router();

router.get('/', numberAgeGroupController.getAll);
router.get('/:id', numberAgeGroupController.getById);
router.get('/species/:speciesId', numberAgeGroupController.getBySpeciesId);
router.post('/', numberAgeGroupController.create);
router.put('/:id', numberAgeGroupController.update);
router.delete('/:id', numberAgeGroupController.delete);

export default router;
