import prisma from '../config/database.js';

export const numberAgeGroupService = {
  async getAll() {
    return await prisma.numberAgeGroup.findMany({
      include: {
        species: true,
        ageGroups: true
      }
    });
  },

  async getById(id) {
    return await prisma.numberAgeGroup.findUnique({
      where: { id: parseInt(id) },
      include: {
        species: true,
        ageGroups: {
          include: {
            survivals: true,
            fecundities: true
          }
        }
      }
    });
  },

  async getBySpeciesId(speciesId) {
    return await prisma.numberAgeGroup.findMany({
      where: { speciesId: parseInt(speciesId) },
      include: {
        ageGroups: true
      }
    });
  },

  async create(data) {
    return await prisma.numberAgeGroup.create({
      data: {
        numberOfAgeGroups: data.numberOfAgeGroups,
        speciesId: data.speciesId ? parseInt(data.speciesId) : null
      }
    });
  },

  async update(id, data) {
    return await prisma.numberAgeGroup.update({
      where: { id: parseInt(id) },
      data: {
        numberOfAgeGroups: data.numberOfAgeGroups,
        speciesId: data.speciesId ? parseInt(data.speciesId) : null
      }
    });
  },

  async delete(id) {
    return await prisma.numberAgeGroup.delete({
      where: { id: parseInt(id) }
    });
  }
};
