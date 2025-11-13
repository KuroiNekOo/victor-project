import { fecundityService } from '../services/fecundityService.js';

export const fecundityController = {
  async getAll(req, res) {
    try {
      const fecundities = await fecundityService.getAll();
      res.json(fecundities);
    } catch (error) {
      console.error('Error fetching fecundities:', error);
      res.status(500).json({ error: 'Failed to fetch fecundities' });
    }
  },

  async getById(req, res) {
    try {
      const fecundity = await fecundityService.getById(req.params.id);
      if (!fecundity) {
        return res.status(404).json({ error: 'Fecundity not found' });
      }
      res.json(fecundity);
    } catch (error) {
      console.error('Error fetching fecundity:', error);
      res.status(500).json({ error: 'Failed to fetch fecundity' });
    }
  },

  async getByAgeGroupId(req, res) {
    try {
      const fecundities = await fecundityService.getByAgeGroupId(req.params.ageGroupId);
      res.json(fecundities);
    } catch (error) {
      console.error('Error fetching fecundities by age group:', error);
      res.status(500).json({ error: 'Failed to fetch fecundities' });
    }
  },

  async create(req, res) {
    try {
      const fecundity = await fecundityService.create(req.body);
      res.status(201).json(fecundity);
    } catch (error) {
      console.error('Error creating fecundity:', error);
      res.status(500).json({ error: 'Failed to create fecundity' });
    }
  },

  async update(req, res) {
    try {
      const fecundity = await fecundityService.update(req.params.id, req.body);
      res.json(fecundity);
    } catch (error) {
      console.error('Error updating fecundity:', error);
      res.status(500).json({ error: 'Failed to update fecundity' });
    }
  },

  async delete(req, res) {
    try {
      await fecundityService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting fecundity:', error);
      res.status(500).json({ error: 'Failed to delete fecundity' });
    }
  }
};
