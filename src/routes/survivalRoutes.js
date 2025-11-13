import express from 'express';
import { survivalController } from '../controllers/survivalController.js';

const router = express.Router();

router.get('/', survivalController.getAll);
router.get('/:id', survivalController.getById);
router.get('/age-group/:ageGroupId', survivalController.getByAgeGroupId);
router.post('/', survivalController.create);
router.put('/:id', survivalController.update);
router.delete('/:id', survivalController.delete);

export default router;
