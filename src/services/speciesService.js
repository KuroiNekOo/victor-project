import prisma from '../config/database.js';

export const speciesService = {
  async getAll() {
    return await prisma.species.findMany({
      orderBy: { speciesLat: 'asc' }
    });
  },

  async getById(id) {
    return await prisma.species.findUnique({
      where: { id: parseInt(id) },
      include: {
        dispersalDistance: true,
        numberAgeGroups: {
          include: {
            ageGroups: {
              include: {
                survivals: true,
                fecundities: true
              }
            }
          }
        },
        biliographies: {
          include: {
            bibliography: true
          }
        }
      }
    });
  },

  async create(data) {
    return await prisma.species.create({
      data: {
        speciesFr: data.speciesFr,
        speciesLat: data.speciesLat,
        speciesEn: data.speciesEn,
        family: data.family,
        genus: data.genus,
        inFrance: data.inFrance,
        inEurope: data.inEurope
      }
    });
  },

  async update(id, data) {
    return await prisma.species.update({
      where: { id: parseInt(id) },
      data: {
        speciesFr: data.speciesFr,
        speciesLat: data.speciesLat,
        speciesEn: data.speciesEn,
        family: data.family,
        genus: data.genus,
        inFrance: data.inFrance,
        inEurope: data.inEurope
      }
    });
  },

  async delete(id) {
    return await prisma.species.delete({
      where: { id: parseInt(id) }
    });
  }
};
