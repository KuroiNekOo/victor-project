import prisma from '../config/database.js';

export const ageGroupService = {
  async getAll() {
    return await prisma.ageGroup.findMany({
      include: {
        numberAgeGroup: true,
        survivals: true,
        fecundities: true
      }
    });
  },

  async getById(id) {
    return await prisma.ageGroup.findUnique({
      where: { id: parseInt(id) },
      include: {
        numberAgeGroup: true,
        survivals: true,
        fecundities: true
      }
    });
  },

  async getByNumberAgeGroupId(numberAgeGroupId) {
    return await prisma.ageGroup.findMany({
      where: { numberAgeGroupId: parseInt(numberAgeGroupId) },
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
        numberAgeGroupId: data.numberAgeGroupId ? parseInt(data.numberAgeGroupId) : null
      }
    });
  },

  async update(id, data) {
    return await prisma.ageGroup.update({
      where: { id: parseInt(id) },
      data: {
        ageGroup: data.ageGroup,
        consideredAs: data.consideredAs,
        numberAgeGroupId: data.numberAgeGroupId ? parseInt(data.numberAgeGroupId) : null
      }
    });
  },

  async delete(id) {
    return await prisma.ageGroup.delete({
      where: { id: parseInt(id) }
    });
  }
};
