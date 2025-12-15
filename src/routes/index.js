import express from 'express';
import speciesRoutes from './speciesRoutes.js';
import bibliographyRoutes from './bibliographyRoutes.js';
import ageGroupRoutes from './ageGroupRoutes.js';
import survivalRoutes from './survivalRoutes.js';
import fecundityRoutes from './fecundityRoutes.js';
import dispersalRoutes from './dispersalRoutes.js';

const router = express.Router();

// Monter toutes les routes API
router.use('/species', speciesRoutes);
router.use('/bibliographies', bibliographyRoutes);
router.use('/age-groups', ageGroupRoutes);
router.use('/survivals', survivalRoutes);
router.use('/fecundities', fecundityRoutes);
router.use('/dispersals', dispersalRoutes);

export default router;
