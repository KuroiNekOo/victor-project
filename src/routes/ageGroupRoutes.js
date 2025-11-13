import express from 'express';
import { ageGroupController } from '../controllers/ageGroupController.js';

const router = express.Router();

router.get('/', ageGroupController.getAll);
router.get('/:id', ageGroupController.getById);
router.get('/number-age-group/:numberAgeGroupId', ageGroupController.getByNumberAgeGroupId);
router.post('/', ageGroupController.create);
router.put('/:id', ageGroupController.update);
router.delete('/:id', ageGroupController.delete);

export default router;
