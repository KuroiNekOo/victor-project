import { numberAgeGroupService } from '../services/numberAgeGroupService.js';

export const numberAgeGroupController = {
  async getAll(req, res) {
    try {
      const groups = await numberAgeGroupService.getAll();
      res.json(groups);
    } catch (error) {
      console.error('Error fetching number age groups:', error);
      res.status(500).json({ error: 'Failed to fetch number age groups' });
    }
  },

  async getById(req, res) {
    try {
      const group = await numberAgeGroupService.getById(req.params.id);
      if (!group) {
        return res.status(404).json({ error: 'Number age group not found' });
      }
      res.json(group);
    } catch (error) {
      console.error('Error fetching number age group:', error);
      res.status(500).json({ error: 'Failed to fetch number age group' });
    }
  },

  async getBySpeciesId(req, res) {
    try {
      const groups = await numberAgeGroupService.getBySpeciesId(req.params.speciesId);
      res.json(groups);
    } catch (error) {
      console.error('Error fetching number age groups by species:', error);
      res.status(500).json({ error: 'Failed to fetch number age groups' });
    }
  },

  async create(req, res) {
    try {
      const group = await numberAgeGroupService.create(req.body);
      res.status(201).json(group);
    } catch (error) {
      console.error('Error creating number age group:', error);
      res.status(500).json({ error: 'Failed to create number age group' });
    }
  },

  async update(req, res) {
    try {
      const group = await numberAgeGroupService.update(req.params.id, req.body);
      res.json(group);
    } catch (error) {
      console.error('Error updating number age group:', error);
      res.status(500).json({ error: 'Failed to update number age group' });
    }
  },

  async delete(req, res) {
    try {
      await numberAgeGroupService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting number age group:', error);
      res.status(500).json({ error: 'Failed to delete number age group' });
    }
  }
};
