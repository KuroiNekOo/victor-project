import express from 'express';
import { bibliographyController } from '../controllers/bibliographyController.js';

const router = express.Router();

router.get('/', bibliographyController.getAll);
router.get('/get-bibliography-species-id', bibliographyController.getBibliographySpeciesId); // Doit être avant /:id
router.get('/species/:speciesId', bibliographyController.getBySpeciesId);
router.get('/:id', bibliographyController.getById);
router.post('/', bibliographyController.create);
router.put('/:id', bibliographyController.update);
router.delete('/:id', bibliographyController.delete);

export default router;
