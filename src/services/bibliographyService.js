import prisma from '../config/database.js';

export const bibliographyService = {
  async getAll() {
    return await prisma.bibliography.findMany({
      include: {
        species: {
          include: {
            species: true
          }
        }
      }
    });
  },

  async getById(id) {
    return await prisma.bibliography.findUnique({
      where: { id: parseInt(id) },
      include: {
        species: {
          include: {
            species: true
          }
        }
      }
    });
  },

  async getBySpeciesId(speciesId) {
    const results = await prisma.bibliographySpecies.findMany({
      where: { speciesId: parseInt(speciesId) },
      include: {
        bibliography: true
      }
    });
    return results.map(r => r.bibliography);
  },

  async create(data) {
    const { speciesId, ...bibliographyData } = data;

    // Créer la bibliographie
    const bibliography = await prisma.bibliography.create({
      data: bibliographyData
    });

    // Créer la relation avec l'espèce
    if (speciesId) {
      await prisma.bibliographySpecies.create({
        data: {
          bibliographyId: bibliography.id,
          speciesId: parseInt(speciesId)
        }
      });
    }

    return bibliography;
  },

  async update(id, data) {
    const { speciesId, ...bibliographyData } = data;

    return await prisma.bibliography.update({
      where: { id: parseInt(id) },
      data: bibliographyData
    });
  },

  async delete(id) {
    return await prisma.bibliography.delete({
      where: { id: parseInt(id) }
    });
  }
};
