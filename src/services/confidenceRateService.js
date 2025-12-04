import prisma from '../config/database.js';

export const confidenceRateService = {
  async getAll() {
    return await prisma.confidenceRate.findMany({
      include: {
        survivals: true,
        fecundities: true,
        dispersals: true
      }
    });
  },

  async getById(id) {
    return await prisma.confidenceRate.findUnique({
      where: { id: parseInt(id) },
      include: {
        survivals: true,
        fecundities: true,
        dispersals: true
      }
    });
  },

  async getBySurvivalId(survivalId) {
    const relations = await prisma.survivalConfidenceRate.findMany({
      where: { survivalId: parseInt(survivalId) },
      include: { confidenceRate: true }
    });
    return relations.map(r => r.confidenceRate);
  },

  async getByFecundityId(fecundityId) {
    const relations = await prisma.fecundityConfidenceRate.findMany({
      where: { fecundityId: parseInt(fecundityId) },
      include: { confidenceRate: true }
    });
    return relations.map(r => r.confidenceRate);
  },

  async getByDispersalId(dispersalId) {
    const relations = await prisma.dispersalConfidenceRate.findMany({
      where: { dispersalId: parseInt(dispersalId) },
      include: { confidenceRate: true }
    });
    return relations.map(r => r.confidenceRate);
  },

  async create(data) {
    return await prisma.confidenceRate.create({
      data: {
        se: data.se,
        lowIC: data.lowIC,
        highIC: data.highIC,
        dataQuality: data.dataQuality
      }
    });
  },

  async update(id, data) {
    return await prisma.confidenceRate.update({
      where: { id: parseInt(id) },
      data: {
        se: data.se,
        lowIC: data.lowIC,
        highIC: data.highIC,
        dataQuality: data.dataQuality
      }
    });
  },

  async delete(id) {
    return await prisma.confidenceRate.delete({
      where: { id: parseInt(id) }
    });
  },

  // Association methods
  async linkToSurvival(confidenceRateId, survivalId) {
    return await prisma.survivalConfidenceRate.create({
      data: {
        survivalId: parseInt(survivalId),
        confidenceRateId: parseInt(confidenceRateId)
      }
    });
  },

  async unlinkFromSurvival(confidenceRateId, survivalId) {
    return await prisma.survivalConfidenceRate.deleteMany({
      where: {
        survivalId: parseInt(survivalId),
        confidenceRateId: parseInt(confidenceRateId)
      }
    });
  },

  async linkToFecundity(confidenceRateId, fecundityId) {
    return await prisma.fecundityConfidenceRate.create({
      data: {
        fecundityId: parseInt(fecundityId),
        confidenceRateId: parseInt(confidenceRateId)
      }
    });
  },

  async unlinkFromFecundity(confidenceRateId, fecundityId) {
    return await prisma.fecundityConfidenceRate.deleteMany({
      where: {
        fecundityId: parseInt(fecundityId),
        confidenceRateId: parseInt(confidenceRateId)
      }
    });
  },

  async linkToDispersal(confidenceRateId, dispersalId) {
    return await prisma.dispersalConfidenceRate.create({
      data: {
        dispersalId: parseInt(dispersalId),
        confidenceRateId: parseInt(confidenceRateId)
      }
    });
  },

  async unlinkFromDispersal(confidenceRateId, dispersalId) {
    return await prisma.dispersalConfidenceRate.deleteMany({
      where: {
        dispersalId: parseInt(dispersalId),
        confidenceRateId: parseInt(confidenceRateId)
      }
    });
  }
};
