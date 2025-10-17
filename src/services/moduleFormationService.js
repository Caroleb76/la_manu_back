import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getModuleFormations = async () => {
  try {
    const moduleFormations = await prisma.moduleFormation.findMany(
      {
        include : {
         Formation : true
        }
      }
    );

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
    if (!moduleFormation) {
      throw new Error("aucun moduleFormation trouvé");
    }
    return moduleFormation;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getModuleFormationByFormationId = async (formationId) => {
  try {
    const modules = await prisma.moduleFormation.findMany({
      where: {
        formationId: formationId,
      },
    })
    if (!modules) {
      throw new Error("aucun moduleFormation trouvé");
    }
    return modules;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateModuleFormation = async (id, data) => {
  console.log("updateModule")
  try {
    const updated = await prisma.moduleFormation.update({
      where: { id },
      data,
    });
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

    return moduleFormation;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteModuleFormationById = async (id) => {
  try {
    const moduleFormation = await prisma.moduleFormation.destroy({
      where: {
        id: id,
      },
    });
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
  getModuleFormationByFormationId
};
