import prisma from '../config/database.js';

export const survivalService = {
  async getAll() {
    return await prisma.survival.findMany({
      include: {
        ageGroupRef: true
      }
    });
  },

  async getById(id) {
    return await prisma.survival.findUnique({
      where: { id: parseInt(id) },
      include: {
        ageGroupRef: true
      }
    });
  },

  async getByAgeGroupId(ageGroupId) {
    return await prisma.survival.findMany({
      where: { ageGroupId: parseInt(ageGroupId) }
    });
  },

  async create(data) {
    return await prisma.survival.create({
      data: {
        ageGroup: data.ageGroup,
        ageGroupConsideredInPublication: data.ageGroupConsideredInPublication,
        sex: data.sex,
        minSurvivalRate: data.minSurvivalRate,
        meanSurvivalRate: data.meanSurvivalRate,
        maxSurvivalRate: data.maxSurvivalRate,
        recaptureProbability: data.recaptureProbability,
        minLongevityYears: data.minLongevityYears,
        meanLongevityYears: data.meanLongevityYears,
        maxLongevityYears: data.maxLongevityYears,
        se: data.se,
        lowCI: data.lowCI,
        highCI: data.highCI,
        ageGroupId: data.ageGroupId ? parseInt(data.ageGroupId) : null
      }
    });
  },

  async update(id, data) {
    return await prisma.survival.update({
      where: { id: parseInt(id) },
      data: {
        ageGroup: data.ageGroup,
        ageGroupConsideredInPublication: data.ageGroupConsideredInPublication,
        sex: data.sex,
        minSurvivalRate: data.minSurvivalRate,
        meanSurvivalRate: data.meanSurvivalRate,
        maxSurvivalRate: data.maxSurvivalRate,
        recaptureProbability: data.recaptureProbability,
        minLongevityYears: data.minLongevityYears,
        meanLongevityYears: data.meanLongevityYears,
        maxLongevityYears: data.maxLongevityYears,
        se: data.se,
        lowCI: data.lowCI,
        highCI: data.highCI,
        ageGroupId: data.ageGroupId ? parseInt(data.ageGroupId) : null
      }
    });
  },

  async delete(id) {
    return await prisma.survival.delete({
      where: { id: parseInt(id) }
    });
  }
};
