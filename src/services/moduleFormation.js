import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getModuleFormations = async () => {
  try {
    const moduleFormations = await prisma.moduleFormation.findMany();

    console.log(moduleFormations);
    return moduleFormations;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getModuleFormationById = async (id) => {
  try {
    const moduleFormation = await prisma.moduleFormation.findUnique({
      where: {
        id: id,
      },
    });
    console.log(moduleFormation);
    return moduleFormation;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateModuleFormation = async (id, data) => {
  try {
    const updated = await prisma.moduleFormation.update({
      where: { id },
      data,
    });
    console.log("Module de formation mis à jour :", updated);
    return updated;
  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error);
    throw error;
  }
};

const createModuleFormation = async (data) => {
  try {
    const moduleFormation = await prisma.moduleFormation.create({
      data,
    });

    console.log(moduleFormation);
    return moduleFormation;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteModuleFormationById = async (id) => {
  try {
    const moduleFormation = await prisma.moduleFormation.delete({
      where: {
        id: id,
      },
    });
    console.log(moduleFormation);
    return moduleFormation;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default {
  getModuleFormations,
  getModuleFormationById,
  updateModuleFormation,
  createModuleFormation,
  deleteModuleFormationById,
};
