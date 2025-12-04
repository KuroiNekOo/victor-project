import express from 'express';
import { confidenceRateController } from '../controllers/confidenceRateController.js';

const router = express.Router();

// CRUD routes
router.get('/', confidenceRateController.getAll);
router.get('/:id', confidenceRateController.getById);
router.post('/', confidenceRateController.create);
router.put('/:id', confidenceRateController.update);
router.delete('/:id', confidenceRateController.delete);

// Get by related entity
router.get('/survival/:survivalId', confidenceRateController.getBySurvivalId);
router.get('/fecundity/:fecundityId', confidenceRateController.getByFecundityId);
router.get('/dispersal/:dispersalId', confidenceRateController.getByDispersalId);

// Link/Unlink associations
router.post('/:id/link-survival', confidenceRateController.linkToSurvival);
router.post('/:id/unlink-survival', confidenceRateController.unlinkFromSurvival);
router.post('/:id/link-fecundity', confidenceRateController.linkToFecundity);
router.post('/:id/unlink-fecundity', confidenceRateController.unlinkFromFecundity);
router.post('/:id/link-dispersal', confidenceRateController.linkToDispersal);
router.post('/:id/unlink-dispersal', confidenceRateController.unlinkFromDispersal);

export default router;
