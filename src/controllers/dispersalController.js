import { dispersalService } from '../services/dispersalService.js';

export const dispersalController = {
  async getAll(req, res) {
    try {
      const dispersals = await dispersalService.getAll();
      res.json(dispersals);
    } catch (error) {
      console.error('Error fetching dispersals:', error);
      res.status(500).json({ error: 'Failed to fetch dispersals' });
    }
  },

  async getById(req, res) {
    try {
      const dispersal = await dispersalService.getById(req.params.id);
      if (!dispersal) {
        return res.status(404).json({ error: 'Dispersal not found' });
      }
      res.json(dispersal);
    } catch (error) {
      console.error('Error fetching dispersal:', error);
      res.status(500).json({ error: 'Failed to fetch dispersal' });
    }
  },

  async getBySpeciesId(req, res) {
    try {
      const dispersal = await dispersalService.getBySpeciesId(req.params.speciesId);
      if (!dispersal) {
        return res.status(404).json({ error: 'Dispersal not found' });
      }
      res.json(dispersal);
    } catch (error) {
      console.error('Error fetching dispersal by species:', error);
      res.status(500).json({ error: 'Failed to fetch dispersal' });
    }
  },

  async create(req, res) {
    try {
      const dispersal = await dispersalService.create(req.body);
      res.status(201).json(dispersal);
    } catch (error) {
      console.error('Error creating dispersal:', error);
      res.status(500).json({ error: 'Failed to create dispersal' });
    }
  },

  async update(req, res) {
    try {
      const dispersal = await dispersalService.update(req.params.id, req.body);
      res.json(dispersal);
    } catch (error) {
      console.error('Error updating dispersal:', error);
      res.status(500).json({ error: 'Failed to update dispersal' });
    }
  },

  async delete(req, res) {
    try {
      await dispersalService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting dispersal:', error);
      res.status(500).json({ error: 'Failed to delete dispersal' });
    }
  }
};
