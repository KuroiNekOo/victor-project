import { ageGroupService } from '../services/ageGroupService.js';
import { bibliographyService } from '../services/bibliographyService.js';

export const ageGroupController = {
  async getAll(req, res) {
    try {
      const groups = await ageGroupService.getAll();
      res.json(groups);
    } catch (error) {
      console.error('Error fetching age groups:', error);
      res.status(500).json({ error: 'Failed to fetch age groups' });
    }
  },

  async getById(req, res) {
    try {
      const group = await ageGroupService.getById(req.params.id);
      if (!group) {
        return res.status(404).json({ error: 'Age group not found' });
      }
      res.json(group);
    } catch (error) {
      console.error('Error fetching age group:', error);
      res.status(500).json({ error: 'Failed to fetch age group' });
    }
  },

  async getByBibliographySpecies(req, res) {
    try {
      const { bibliographyId, speciesId } = req.query;

      if (!bibliographyId || !speciesId) {
        return res.status(400).json({ error: 'bibliographyId and speciesId are required' });
      }

      // Récupérer l'ID de BibliographySpecies
      const bibliographySpeciesId = await bibliographyService.getBibliographySpeciesId(bibliographyId, speciesId);

      if (!bibliographySpeciesId) {
        return res.json([]); // Pas de relation, donc pas d'AgeGroups
      }

      const groups = await ageGroupService.getByBibliographySpeciesId(bibliographySpeciesId);
      res.json(groups);
    } catch (error) {
      console.error('Error fetching age groups by bibliography species:', error);
      res.status(500).json({ error: 'Failed to fetch age groups' });
    }
  },

  async create(req, res) {
    try {
      const group = await ageGroupService.create(req.body);
      res.status(201).json(group);
    } catch (error) {
      console.error('Error creating age group:', error);
      res.status(500).json({ error: 'Failed to create age group' });
    }
  },

  async update(req, res) {
    try {
      const group = await ageGroupService.update(req.params.id, req.body);
      res.json(group);
    } catch (error) {
      console.error('Error updating age group:', error);
      res.status(500).json({ error: 'Failed to update age group' });
    }
  },

  async delete(req, res) {
    try {
      await ageGroupService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting age group:', error);
      res.status(500).json({ error: 'Failed to delete age group' });
    }
  }
};
