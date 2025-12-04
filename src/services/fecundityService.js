import prisma from '../config/database.js';

export const fecundityService = {
  async getAll() {
    return await prisma.fecundity.findMany({
      include: {
        ageGroupRef: true
      }
    });
  },

  async getById(id) {
    return await prisma.fecundity.findUnique({
      where: { id: parseInt(id) },
      include: {
        ageGroupRef: true
      }
    });
  },

  async getByAgeGroupId(ageGroupId) {
    return await prisma.fecundity.findMany({
      where: { ageGroupId: parseInt(ageGroupId) }
    });
  },

  async create(data) {
    return await prisma.fecundity.create({
      data: {
        ageGroup: data.ageGroup,
        ageGroupConsideredInPublication: data.ageGroupConsideredInPublication,
        minFecundityRate: data.minFecundityRate,
        meanFecundityRate: data.meanFecundityRate,
        maxFecundityRate: data.maxFecundityRate,
        minProductivity: data.minProductivity,
        meanProductivity: data.meanProductivity,
        maxProductivity: data.maxProductivity,
        se: data.se,
        lowCI: data.lowCI,
        highCI: data.highCI,
        ageGroupId: data.ageGroupId ? parseInt(data.ageGroupId) : null
      }
    });
  },

  async update(id, data) {
    return await prisma.fecundity.update({
      where: { id: parseInt(id) },
      data: {
        ageGroup: data.ageGroup,
        ageGroupConsideredInPublication: data.ageGroupConsideredInPublication,
        minFecundityRate: data.minFecundityRate,
        meanFecundityRate: data.meanFecundityRate,
        maxFecundityRate: data.maxFecundityRate,
        minProductivity: data.minProductivity,
        meanProductivity: data.meanProductivity,
        maxProductivity: data.maxProductivity,
        se: data.se,
        lowCI: data.lowCI,
        highCI: data.highCI,
        ageGroupId: data.ageGroupId ? parseInt(data.ageGroupId) : null
      }
    });
  },

  async delete(id) {
    return await prisma.fecundity.delete({
      where: { id: parseInt(id) }
    });
  }
};
