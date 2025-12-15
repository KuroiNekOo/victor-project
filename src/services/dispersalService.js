import prisma from '../config/database.js';

export const dispersalService = {
  async getAll() {
    return await prisma.dispersalDistance.findMany({
      include: {
        bibliographySpecies: {
          include: {
            bibliography: true,
            species: true
          }
        }
      }
    });
  },

  async getById(id) {
    return await prisma.dispersalDistance.findUnique({
      where: { id: parseInt(id) },
      include: {
        bibliographySpecies: {
          include: {
            bibliography: true,
            species: true
          }
        }
      }
    });
  },

  async getByBibliographySpeciesId(bibliographySpeciesId) {
    return await prisma.dispersalDistance.findMany({
      where: { bibliographySpeciesId: parseInt(bibliographySpeciesId) },
      include: {
        bibliographySpecies: {
          include: {
            bibliography: true,
            species: true
          }
        }
      }
    });
  },

  async create(data) {
    return await prisma.dispersalDistance.create({
      data: {
        // Champs principaux
        meanDispersalDistance: data.meanDispersalDistance,
        minDispersalDistance: data.minDispersalDistance,
        maxDispersalDistance: data.maxDispersalDistance,
        // Données de confiance pour meanDispersalDistance
        meanDispersalDistanceSe: data.meanDispersalDistanceSe,
        meanDispersalDistanceLowCI: data.meanDispersalDistanceLowCI,
        meanDispersalDistanceHighCI: data.meanDispersalDistanceHighCI,
        meanDispersalDistanceDataQuality: data.meanDispersalDistanceDataQuality,
        // Données de confiance pour minDispersalDistance
        minDispersalDistanceSe: data.minDispersalDistanceSe,
        minDispersalDistanceLowCI: data.minDispersalDistanceLowCI,
        minDispersalDistanceHighCI: data.minDispersalDistanceHighCI,
        minDispersalDistanceDataQuality: data.minDispersalDistanceDataQuality,
        // Données de confiance pour maxDispersalDistance
        maxDispersalDistanceSe: data.maxDispersalDistanceSe,
        maxDispersalDistanceLowCI: data.maxDispersalDistanceLowCI,
        maxDispersalDistanceHighCI: data.maxDispersalDistanceHighCI,
        maxDispersalDistanceDataQuality: data.maxDispersalDistanceDataQuality,
        // Relation
        bibliographySpeciesId: data.bibliographySpeciesId ? parseInt(data.bibliographySpeciesId) : null
      }
    });
  },

  async update(id, data) {
    return await prisma.dispersalDistance.update({
      where: { id: parseInt(id) },
      data: {
        // Champs principaux
        meanDispersalDistance: data.meanDispersalDistance,
        minDispersalDistance: data.minDispersalDistance,
        maxDispersalDistance: data.maxDispersalDistance,
        // Données de confiance pour meanDispersalDistance
        meanDispersalDistanceSe: data.meanDispersalDistanceSe,
        meanDispersalDistanceLowCI: data.meanDispersalDistanceLowCI,
        meanDispersalDistanceHighCI: data.meanDispersalDistanceHighCI,
        meanDispersalDistanceDataQuality: data.meanDispersalDistanceDataQuality,
        // Données de confiance pour minDispersalDistance
        minDispersalDistanceSe: data.minDispersalDistanceSe,
        minDispersalDistanceLowCI: data.minDispersalDistanceLowCI,
        minDispersalDistanceHighCI: data.minDispersalDistanceHighCI,
        minDispersalDistanceDataQuality: data.minDispersalDistanceDataQuality,
        // Données de confiance pour maxDispersalDistance
        maxDispersalDistanceSe: data.maxDispersalDistanceSe,
        maxDispersalDistanceLowCI: data.maxDispersalDistanceLowCI,
        maxDispersalDistanceHighCI: data.maxDispersalDistanceHighCI,
        maxDispersalDistanceDataQuality: data.maxDispersalDistanceDataQuality
      }
    });
  },

  async delete(id) {
    return await prisma.dispersalDistance.delete({
      where: { id: parseInt(id) }
    });
  }
};
