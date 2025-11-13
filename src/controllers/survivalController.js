import { survivalService } from '../services/survivalService.js';

export const survivalController = {
  async getAll(req, res) {
    try {
      const survivals = await survivalService.getAll();
      res.json(survivals);
    } catch (error) {
      console.error('Error fetching survivals:', error);
      res.status(500).json({ error: 'Failed to fetch survivals' });
    }
  },

  async getById(req, res) {
    try {
      const survival = await survivalService.getById(req.params.id);
      if (!survival) {
        return res.status(404).json({ error: 'Survival not found' });
      }
      res.json(survival);
    } catch (error) {
      console.error('Error fetching survival:', error);
      res.status(500).json({ error: 'Failed to fetch survival' });
    }
  },

  async getByAgeGroupId(req, res) {
    try {
      const survivals = await survivalService.getByAgeGroupId(req.params.ageGroupId);
      res.json(survivals);
    } catch (error) {
      console.error('Error fetching survivals by age group:', error);
      res.status(500).json({ error: 'Failed to fetch survivals' });
    }
  },

  async create(req, res) {
    try {
      const survival = await survivalService.create(req.body);
      res.status(201).json(survival);
    } catch (error) {
      console.error('Error creating survival:', error);
      res.status(500).json({ error: 'Failed to create survival' });
    }
  },

  async update(req, res) {
    try {
      const survival = await survivalService.update(req.params.id, req.body);
      res.json(survival);
    } catch (error) {
      console.error('Error updating survival:', error);
      res.status(500).json({ error: 'Failed to update survival' });
    }
  },

  async delete(req, res) {
    try {
      await survivalService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting survival:', error);
      res.status(500).json({ error: 'Failed to delete survival' });
    }
  }
};
