import { confidenceRateService } from '../services/confidenceRateService.js';

export const confidenceRateController = {
  async getAll(req, res) {
    try {
      const confidenceRates = await confidenceRateService.getAll();
      res.json(confidenceRates);
    } catch (error) {
      console.error('Error fetching confidence rates:', error);
      res.status(500).json({ error: 'Failed to fetch confidence rates' });
    }
  },

  async getById(req, res) {
    try {
      const confidenceRate = await confidenceRateService.getById(req.params.id);
      if (!confidenceRate) {
        return res.status(404).json({ error: 'Confidence rate not found' });
      }
      res.json(confidenceRate);
    } catch (error) {
      console.error('Error fetching confidence rate:', error);
      res.status(500).json({ error: 'Failed to fetch confidence rate' });
    }
  },

  async getBySurvivalId(req, res) {
    try {
      const confidenceRates = await confidenceRateService.getBySurvivalId(req.params.survivalId);
      res.json(confidenceRates);
    } catch (error) {
      console.error('Error fetching confidence rates by survival:', error);
      res.status(500).json({ error: 'Failed to fetch confidence rates' });
    }
  },

  async getByFecundityId(req, res) {
    try {
      const confidenceRates = await confidenceRateService.getByFecundityId(req.params.fecundityId);
      res.json(confidenceRates);
    } catch (error) {
      console.error('Error fetching confidence rates by fecundity:', error);
      res.status(500).json({ error: 'Failed to fetch confidence rates' });
    }
  },

  async getByDispersalId(req, res) {
    try {
      const confidenceRates = await confidenceRateService.getByDispersalId(req.params.dispersalId);
      res.json(confidenceRates);
    } catch (error) {
      console.error('Error fetching confidence rates by dispersal:', error);
      res.status(500).json({ error: 'Failed to fetch confidence rates' });
    }
  },

  async create(req, res) {
    try {
      const confidenceRate = await confidenceRateService.create(req.body);
      res.status(201).json(confidenceRate);
    } catch (error) {
      console.error('Error creating confidence rate:', error);
      res.status(500).json({ error: 'Failed to create confidence rate' });
    }
  },

  async update(req, res) {
    try {
      const confidenceRate = await confidenceRateService.update(req.params.id, req.body);
      res.json(confidenceRate);
    } catch (error) {
      console.error('Error updating confidence rate:', error);
      res.status(500).json({ error: 'Failed to update confidence rate' });
    }
  },

  async delete(req, res) {
    try {
      await confidenceRateService.delete(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting confidence rate:', error);
      res.status(500).json({ error: 'Failed to delete confidence rate' });
    }
  },

  // Association endpoints
  async linkToSurvival(req, res) {
    try {
      const { survivalId } = req.body;
      const result = await confidenceRateService.linkToSurvival(req.params.id, survivalId);
      res.status(201).json(result);
    } catch (error) {
      console.error('Error linking confidence rate to survival:', error);
      res.status(500).json({ error: 'Failed to link confidence rate to survival' });
    }
  },

  async unlinkFromSurvival(req, res) {
    try {
      const { survivalId } = req.body;
      await confidenceRateService.unlinkFromSurvival(req.params.id, survivalId);
      res.status(204).send();
    } catch (error) {
      console.error('Error unlinking confidence rate from survival:', error);
      res.status(500).json({ error: 'Failed to unlink confidence rate from survival' });
    }
  },

  async linkToFecundity(req, res) {
    try {
      const { fecundityId } = req.body;
      const result = await confidenceRateService.linkToFecundity(req.params.id, fecundityId);
      res.status(201).json(result);
    } catch (error) {
      console.error('Error linking confidence rate to fecundity:', error);
      res.status(500).json({ error: 'Failed to link confidence rate to fecundity' });
    }
  },

  async unlinkFromFecundity(req, res) {
    try {
      const { fecundityId } = req.body;
      await confidenceRateService.unlinkFromFecundity(req.params.id, fecundityId);
      res.status(204).send();
    } catch (error) {
      console.error('Error unlinking confidence rate from fecundity:', error);
      res.status(500).json({ error: 'Failed to unlink confidence rate from fecundity' });
    }
  },

  async linkToDispersal(req, res) {
    try {
      const { dispersalId } = req.body;
      const result = await confidenceRateService.linkToDispersal(req.params.id, dispersalId);
      res.status(201).json(result);
    } catch (error) {
      console.error('Error linking confidence rate to dispersal:', error);
      res.status(500).json({ error: 'Failed to link confidence rate to dispersal' });
    }
  },

  async unlinkFromDispersal(req, res) {
    try {
      const { dispersalId } = req.body;
      await confidenceRateService.unlinkFromDispersal(req.params.id, dispersalId);
      res.status(204).send();
    } catch (error) {
      console.error('Error unlinking confidence rate from dispersal:', error);
      res.status(500).json({ error: 'Failed to unlink confidence rate from dispersal' });
    }
  }
};
