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

  async getBibliographySpeciesId(bibliographyId, speciesId) {
    // Récupérer l'ID de BibliographySpecies pour une combinaison bibliography+species
    const result = await prisma.bibliographySpecies.findFirst({
      where: {
        bibliographyId: parseInt(bibliographyId),
        speciesId: parseInt(speciesId)
      }
    });
    return result?.id || null;
  },

  async create(data) {
    const { speciesIds, ...bibliographyData } = data;

    // Créer la bibliographie
    const bibliography = await prisma.bibliography.create({
      data: bibliographyData
    });

    // Créer les relations avec les espèces (peut être plusieurs)
    if (speciesIds && Array.isArray(speciesIds) && speciesIds.length > 0) {
      const relationData = speciesIds.map(speciesId => ({
        bibliographyId: bibliography.id,
        speciesId: parseInt(speciesId)
      }));

      await prisma.bibliographySpecies.createMany({
        data: relationData
      });
    }

    return bibliography;
  },

  async update(id, data) {
    const { speciesIds, ...bibliographyData } = data;

    // Mettre à jour la bibliographie
    const bibliography = await prisma.bibliography.update({
      where: { id: parseInt(id) },
      data: bibliographyData
    });

    // Mettre à jour les relations avec les espèces si speciesIds est fourni
    if (speciesIds && Array.isArray(speciesIds)) {
      // Supprimer les anciennes relations
      await prisma.bibliographySpecies.deleteMany({
        where: { bibliographyId: parseInt(id) }
      });

      // Créer les nouvelles relations
      if (speciesIds.length > 0) {
        const relationData = speciesIds.map(speciesId => ({
          bibliographyId: parseInt(id),
          speciesId: parseInt(speciesId)
        }));

        await prisma.bibliographySpecies.createMany({
          data: relationData
        });
      }
    }

    return bibliography;
  },

  async delete(id) {
    return await prisma.bibliography.delete({
      where: { id: parseInt(id) }
    });
  }
};
