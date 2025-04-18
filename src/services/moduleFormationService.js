import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getmoduleFormations = async () => {
  try {
    const moduleFormations = await prisma.moduleFormations.findMany();

    console.log(moduleFormations);
    return moduleFormations;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getmoduleFormationById = async (id) => {
  try {
    const moduleFormation = await prisma.moduleFormation.findUnique({
      where: {
        id: id,
      },
    });
    if (!moduleFormation) {
      throw new Error("aucun moduleFormation trouvé");
    }
    console.log(moduleFormation);
    return moduleFormation;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updatemoduleFormation = async (id, data) => {
  try {
    const updated = await prisma.moduleFormation.update({
      where: { id },
      data,
    });
    console.log("moduleFormation mise à jour :", updated);
    return updated;
  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error);
    throw error;
  }
};

const createmoduleFormation = async (data) => {
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

const deletemoduleFormationById = async (id) => {
  try {
    const moduleFormation = await prisma.moduleFormation.destroy({
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
  getmoduleFormations,
  getmoduleFormationById,
  updatemoduleFormation,
  createmoduleFormation,
  deletemoduleFormationById,
};
