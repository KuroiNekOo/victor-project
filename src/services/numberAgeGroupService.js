import prisma from '../config/database.js';

export const numberAgeGroupService = {
  async getAll() {
    return await prisma.numberAgeGroup.findMany({
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
    return await prisma.numberAgeGroup.findUnique({
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
    // One-to-one relation : retourne UN SEUL NumberAgeGroup (ou null)
    return await prisma.numberAgeGroup.findUnique({
      where: { bibliographySpeciesId: parseInt(bibliographySpeciesId) }
    });
  },

  async create(data) {
    return await prisma.numberAgeGroup.create({
      data: {
        numberOfAgeGroups: data.numberOfAgeGroups,
        bibliographySpeciesId: data.bibliographySpeciesId ? parseInt(data.bibliographySpeciesId) : null
      }
    });
  },

  async update(id, data) {
    return await prisma.numberAgeGroup.update({
      where: { id: parseInt(id) },
      data: {
        numberOfAgeGroups: data.numberOfAgeGroups,
        bibliographySpeciesId: data.bibliographySpeciesId ? parseInt(data.bibliographySpeciesId) : null
      }
    });
  },

  async delete(id) {
    return await prisma.numberAgeGroup.delete({
      where: { id: parseInt(id) }
    });
  }
};
