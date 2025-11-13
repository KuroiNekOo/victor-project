import prisma from '../config/database.js';

export const ageGroupService = {
  async getAll() {
    return await prisma.ageGroup.findMany({
      include: {
        bibliographySpecies: {
          include: {
            bibliography: true,
            species: true
          }
        },
        survivals: true,
        fecundities: true
      }
    });
  },

  async getById(id) {
    return await prisma.ageGroup.findUnique({
      where: { id: parseInt(id) },
      include: {
        bibliographySpecies: {
          include: {
            bibliography: true,
            species: true
          }
        },
        survivals: true,
        fecundities: true
      }
    });
  },

  async getByBibliographySpeciesId(bibliographySpeciesId) {
    return await prisma.ageGroup.findMany({
      where: { bibliographySpeciesId: parseInt(bibliographySpeciesId) },
      include: {
        survivals: true,
        fecundities: true
      }
    });
  },

  async create(data) {
    return await prisma.ageGroup.create({
      data: {
        ageGroup: data.ageGroup,
        consideredAs: data.consideredAs,
        bibliographySpeciesId: data.bibliographySpeciesId ? parseInt(data.bibliographySpeciesId) : null
      }
    });
  },

  async update(id, data) {
    return await prisma.ageGroup.update({
      where: { id: parseInt(id) },
      data: {
        ageGroup: data.ageGroup,
        consideredAs: data.consideredAs,
        bibliographySpeciesId: data.bibliographySpeciesId ? parseInt(data.bibliographySpeciesId) : null
      }
    });
  },

  async delete(id) {
    return await prisma.ageGroup.delete({
      where: { id: parseInt(id) }
    });
  }
};
