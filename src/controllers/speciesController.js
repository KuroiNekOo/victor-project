import { speciesService } from '../services/speciesService.js';

export const speciesController = {
  async getAll(req, res) {
    try {
      const species = await speciesService.getAll();
      res.json(species);
    } catch (error) {
      console.error('Error fetching species:', error);
      res.status(500).json({ error: 'Failed to fetch species' });
    }
  },

  async getById(req, res) {
    try {
      const species = await speciesService.getById(req.params.id);
      if (!species) {
        return res.status(404).json({ error: 'Species not found' });
      }
      res.json(species);
    } catch (error) {
      console.error('Error fetching species:', error);
      res.status(500).json({ error: 'Failed to fetch species' });
    }
  },

  async create(req, res) {
    try {
      const species = await speciesService.create(req.body);
      res.status(201).json(species);
    } catch (error) {
      console.error('Error creating species:', error);
      res.status(500).json({ error: 'Failed to create species' });
    }
  },

  async update(req, res) {
    try {
      const species = await speciesService.update(req.params.id, req.body);
      res.json(species);
    } catch (error) {
      console.error('Error updating species:', error);
      res.status(500).json({ error: 'Failed to update species' });
    }
  },

  async delete(req, res) {
    try {
      await speciesService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting species:', error);
      res.status(500).json({ error: 'Failed to delete species' });
    }
  }
};
