import { bibliographyService } from '../services/bibliographyService.js';

export const bibliographyController = {
  async getAll(req, res) {
    try {
      const bibliographies = await bibliographyService.getAll();
      res.json(bibliographies);
    } catch (error) {
      console.error('Error fetching bibliographies:', error);
      res.status(500).json({ error: 'Failed to fetch bibliographies' });
    }
  },

  async getById(req, res) {
    try {
      const bibliography = await bibliographyService.getById(req.params.id);
      if (!bibliography) {
        return res.status(404).json({ error: 'Bibliography not found' });
      }
      res.json(bibliography);
    } catch (error) {
      console.error('Error fetching bibliography:', error);
      res.status(500).json({ error: 'Failed to fetch bibliography' });
    }
  },

  async getBySpeciesId(req, res) {
    try {
      const bibliographies = await bibliographyService.getBySpeciesId(req.params.speciesId);
      res.json(bibliographies);
    } catch (error) {
      console.error('Error fetching bibliographies by species:', error);
      res.status(500).json({ error: 'Failed to fetch bibliographies' });
    }
  },

  async getBibliographySpeciesId(req, res) {
    try {
      const { bibliographyId, speciesId } = req.query;

      if (!bibliographyId || !speciesId) {
        return res.status(400).json({ error: 'bibliographyId and speciesId are required' });
      }

      const bibliographySpeciesId = await bibliographyService.getBibliographySpeciesId(bibliographyId, speciesId);
      res.json({ bibliographySpeciesId });
    } catch (error) {
      console.error('Error fetching bibliography species ID:', error);
      res.status(500).json({ error: 'Failed to fetch bibliography species ID' });
    }
  },

  async create(req, res) {
    try {
      const bibliography = await bibliographyService.create(req.body);
      res.status(201).json(bibliography);
    } catch (error) {
      console.error('Error creating bibliography:', error);
      res.status(500).json({ error: 'Failed to create bibliography' });
    }
  },

  async update(req, res) {
    try {
      const bibliography = await bibliographyService.update(req.params.id, req.body);
      res.json(bibliography);
    } catch (error) {
      console.error('Error updating bibliography:', error);
      res.status(500).json({ error: 'Failed to update bibliography' });
    }
  },

  async delete(req, res) {
    try {
      await bibliographyService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting bibliography:', error);
      res.status(500).json({ error: 'Failed to delete bibliography' });
    }
  }
};
