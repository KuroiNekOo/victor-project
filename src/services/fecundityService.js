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
        // Champs principaux
        minFecundityRate: data.minFecundityRate,
        meanFecundityRate: data.meanFecundityRate,
        maxFecundityRate: data.maxFecundityRate,
        minProductivity: data.minProductivity,
        meanProductivity: data.meanProductivity,
        maxProductivity: data.maxProductivity,
        // Données de confiance pour minFecundityRate
        minFecundityRateSe: data.minFecundityRateSe,
        minFecundityRateLowCI: data.minFecundityRateLowCI,
        minFecundityRateHighCI: data.minFecundityRateHighCI,
        minFecundityRateDataQuality: data.minFecundityRateDataQuality,
        // Données de confiance pour meanFecundityRate
        meanFecundityRateSe: data.meanFecundityRateSe,
        meanFecundityRateLowCI: data.meanFecundityRateLowCI,
        meanFecundityRateHighCI: data.meanFecundityRateHighCI,
        meanFecundityRateDataQuality: data.meanFecundityRateDataQuality,
        // Données de confiance pour maxFecundityRate
        maxFecundityRateSe: data.maxFecundityRateSe,
        maxFecundityRateLowCI: data.maxFecundityRateLowCI,
        maxFecundityRateHighCI: data.maxFecundityRateHighCI,
        maxFecundityRateDataQuality: data.maxFecundityRateDataQuality,
        // Données de confiance pour minProductivity
        minProductivitySe: data.minProductivitySe,
        minProductivityLowCI: data.minProductivityLowCI,
        minProductivityHighCI: data.minProductivityHighCI,
        minProductivityDataQuality: data.minProductivityDataQuality,
        // Données de confiance pour meanProductivity
        meanProductivitySe: data.meanProductivitySe,
        meanProductivityLowCI: data.meanProductivityLowCI,
        meanProductivityHighCI: data.meanProductivityHighCI,
        meanProductivityDataQuality: data.meanProductivityDataQuality,
        // Données de confiance pour maxProductivity
        maxProductivitySe: data.maxProductivitySe,
        maxProductivityLowCI: data.maxProductivityLowCI,
        maxProductivityHighCI: data.maxProductivityHighCI,
        maxProductivityDataQuality: data.maxProductivityDataQuality,
        // Relation
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
        // Champs principaux
        minFecundityRate: data.minFecundityRate,
        meanFecundityRate: data.meanFecundityRate,
        maxFecundityRate: data.maxFecundityRate,
        minProductivity: data.minProductivity,
        meanProductivity: data.meanProductivity,
        maxProductivity: data.maxProductivity,
        // Données de confiance pour minFecundityRate
        minFecundityRateSe: data.minFecundityRateSe,
        minFecundityRateLowCI: data.minFecundityRateLowCI,
        minFecundityRateHighCI: data.minFecundityRateHighCI,
        minFecundityRateDataQuality: data.minFecundityRateDataQuality,
        // Données de confiance pour meanFecundityRate
        meanFecundityRateSe: data.meanFecundityRateSe,
        meanFecundityRateLowCI: data.meanFecundityRateLowCI,
        meanFecundityRateHighCI: data.meanFecundityRateHighCI,
        meanFecundityRateDataQuality: data.meanFecundityRateDataQuality,
        // Données de confiance pour maxFecundityRate
        maxFecundityRateSe: data.maxFecundityRateSe,
        maxFecundityRateLowCI: data.maxFecundityRateLowCI,
        maxFecundityRateHighCI: data.maxFecundityRateHighCI,
        maxFecundityRateDataQuality: data.maxFecundityRateDataQuality,
        // Données de confiance pour minProductivity
        minProductivitySe: data.minProductivitySe,
        minProductivityLowCI: data.minProductivityLowCI,
        minProductivityHighCI: data.minProductivityHighCI,
        minProductivityDataQuality: data.minProductivityDataQuality,
        // Données de confiance pour meanProductivity
        meanProductivitySe: data.meanProductivitySe,
        meanProductivityLowCI: data.meanProductivityLowCI,
        meanProductivityHighCI: data.meanProductivityHighCI,
        meanProductivityDataQuality: data.meanProductivityDataQuality,
        // Données de confiance pour maxProductivity
        maxProductivitySe: data.maxProductivitySe,
        maxProductivityLowCI: data.maxProductivityLowCI,
        maxProductivityHighCI: data.maxProductivityHighCI,
        maxProductivityDataQuality: data.maxProductivityDataQuality,
        // Relation
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
