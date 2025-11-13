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
        meanDispersalDistance: data.meanDispersalDistance,
        minDispersalDistance: data.minDispersalDistance,
        maxDispersalDistance: data.maxDispersalDistance,
        se: data.se,
        lowCI: data.lowCI,
        highCI: data.highCI,
        bibliographySpeciesId: data.bibliographySpeciesId ? parseInt(data.bibliographySpeciesId) : null
      }
    });
  },

  async update(id, data) {
    return await prisma.dispersalDistance.update({
      where: { id: parseInt(id) },
      data: {
        meanDispersalDistance: data.meanDispersalDistance,
        minDispersalDistance: data.minDispersalDistance,
        maxDispersalDistance: data.maxDispersalDistance,
        se: data.se,
        lowCI: data.lowCI,
        highCI: data.highCI
      }
    });
  },

  async delete(id) {
    return await prisma.dispersalDistance.delete({
      where: { id: parseInt(id) }
    });
  }
};
