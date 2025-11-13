import prisma from '../config/database.js';

export const dispersalService = {
  async getAll() {
    return await prisma.dispersalDistance.findMany({
      include: {
        species: true
      }
    });
  },

  async getById(id) {
    return await prisma.dispersalDistance.findUnique({
      where: { id: parseInt(id) },
      include: {
        species: true
      }
    });
  },

  async getBySpeciesId(speciesId) {
    return await prisma.dispersalDistance.findUnique({
      where: { speciesId: parseInt(speciesId) },
      include: {
        species: true
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
        speciesId: parseInt(data.speciesId)
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
