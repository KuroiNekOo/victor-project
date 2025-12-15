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
        // Champs principaux
        minSurvivalRate: data.minSurvivalRate,
        meanSurvivalRate: data.meanSurvivalRate,
        maxSurvivalRate: data.maxSurvivalRate,
        recaptureProbability: data.recaptureProbability,
        minLongevityYears: data.minLongevityYears,
        meanLongevityYears: data.meanLongevityYears,
        maxLongevityYears: data.maxLongevityYears,
        // Données de confiance pour minSurvivalRate
        minSurvivalRateSe: data.minSurvivalRateSe,
        minSurvivalRateLowCI: data.minSurvivalRateLowCI,
        minSurvivalRateHighCI: data.minSurvivalRateHighCI,
        minSurvivalRateDataQuality: data.minSurvivalRateDataQuality,
        // Données de confiance pour meanSurvivalRate
        meanSurvivalRateSe: data.meanSurvivalRateSe,
        meanSurvivalRateLowCI: data.meanSurvivalRateLowCI,
        meanSurvivalRateHighCI: data.meanSurvivalRateHighCI,
        meanSurvivalRateDataQuality: data.meanSurvivalRateDataQuality,
        // Données de confiance pour maxSurvivalRate
        maxSurvivalRateSe: data.maxSurvivalRateSe,
        maxSurvivalRateLowCI: data.maxSurvivalRateLowCI,
        maxSurvivalRateHighCI: data.maxSurvivalRateHighCI,
        maxSurvivalRateDataQuality: data.maxSurvivalRateDataQuality,
        // Données de confiance pour recaptureProbability
        recaptureProbabilitySe: data.recaptureProbabilitySe,
        recaptureProbabilityLowCI: data.recaptureProbabilityLowCI,
        recaptureProbabilityHighCI: data.recaptureProbabilityHighCI,
        recaptureProbabilityDataQuality: data.recaptureProbabilityDataQuality,
        // Données de confiance pour minLongevityYears
        minLongevityYearsSe: data.minLongevityYearsSe,
        minLongevityYearsLowCI: data.minLongevityYearsLowCI,
        minLongevityYearsHighCI: data.minLongevityYearsHighCI,
        minLongevityYearsDataQuality: data.minLongevityYearsDataQuality,
        // Données de confiance pour meanLongevityYears
        meanLongevityYearsSe: data.meanLongevityYearsSe,
        meanLongevityYearsLowCI: data.meanLongevityYearsLowCI,
        meanLongevityYearsHighCI: data.meanLongevityYearsHighCI,
        meanLongevityYearsDataQuality: data.meanLongevityYearsDataQuality,
        // Données de confiance pour maxLongevityYears
        maxLongevityYearsSe: data.maxLongevityYearsSe,
        maxLongevityYearsLowCI: data.maxLongevityYearsLowCI,
        maxLongevityYearsHighCI: data.maxLongevityYearsHighCI,
        maxLongevityYearsDataQuality: data.maxLongevityYearsDataQuality,
        // Relation
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
        // Champs principaux
        minSurvivalRate: data.minSurvivalRate,
        meanSurvivalRate: data.meanSurvivalRate,
        maxSurvivalRate: data.maxSurvivalRate,
        recaptureProbability: data.recaptureProbability,
        minLongevityYears: data.minLongevityYears,
        meanLongevityYears: data.meanLongevityYears,
        maxLongevityYears: data.maxLongevityYears,
        // Données de confiance pour minSurvivalRate
        minSurvivalRateSe: data.minSurvivalRateSe,
        minSurvivalRateLowCI: data.minSurvivalRateLowCI,
        minSurvivalRateHighCI: data.minSurvivalRateHighCI,
        minSurvivalRateDataQuality: data.minSurvivalRateDataQuality,
        // Données de confiance pour meanSurvivalRate
        meanSurvivalRateSe: data.meanSurvivalRateSe,
        meanSurvivalRateLowCI: data.meanSurvivalRateLowCI,
        meanSurvivalRateHighCI: data.meanSurvivalRateHighCI,
        meanSurvivalRateDataQuality: data.meanSurvivalRateDataQuality,
        // Données de confiance pour maxSurvivalRate
        maxSurvivalRateSe: data.maxSurvivalRateSe,
        maxSurvivalRateLowCI: data.maxSurvivalRateLowCI,
        maxSurvivalRateHighCI: data.maxSurvivalRateHighCI,
        maxSurvivalRateDataQuality: data.maxSurvivalRateDataQuality,
        // Données de confiance pour recaptureProbability
        recaptureProbabilitySe: data.recaptureProbabilitySe,
        recaptureProbabilityLowCI: data.recaptureProbabilityLowCI,
        recaptureProbabilityHighCI: data.recaptureProbabilityHighCI,
        recaptureProbabilityDataQuality: data.recaptureProbabilityDataQuality,
        // Données de confiance pour minLongevityYears
        minLongevityYearsSe: data.minLongevityYearsSe,
        minLongevityYearsLowCI: data.minLongevityYearsLowCI,
        minLongevityYearsHighCI: data.minLongevityYearsHighCI,
        minLongevityYearsDataQuality: data.minLongevityYearsDataQuality,
        // Données de confiance pour meanLongevityYears
        meanLongevityYearsSe: data.meanLongevityYearsSe,
        meanLongevityYearsLowCI: data.meanLongevityYearsLowCI,
        meanLongevityYearsHighCI: data.meanLongevityYearsHighCI,
        meanLongevityYearsDataQuality: data.meanLongevityYearsDataQuality,
        // Données de confiance pour maxLongevityYears
        maxLongevityYearsSe: data.maxLongevityYearsSe,
        maxLongevityYearsLowCI: data.maxLongevityYearsLowCI,
        maxLongevityYearsHighCI: data.maxLongevityYearsHighCI,
        maxLongevityYearsDataQuality: data.maxLongevityYearsDataQuality,
        // Relation
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
