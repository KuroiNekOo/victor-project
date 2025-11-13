import express from 'express';
import { fecundityController } from '../controllers/fecundityController.js';

const router = express.Router();

router.get('/', fecundityController.getAll);
router.get('/:id', fecundityController.getById);
router.get('/age-group/:ageGroupId', fecundityController.getByAgeGroupId);
router.post('/', fecundityController.create);
router.put('/:id', fecundityController.update);
router.delete('/:id', fecundityController.delete);

export default router;
