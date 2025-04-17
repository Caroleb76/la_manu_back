import { prismaClient } from "@prisma/client";

const prisma = new prismaClient();

const getformations = async () => {
  try {
    const formations = await prisma.formations.findMany();

    console.log(formations);
    return formations;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getformationById = async (id) => {
  try {
    const formation = await prisma.formation.findUnique({
      where: {
        id: id,
      },
    });
    if (!formation) {
      throw new Error("aucune formation trouvée");
    }
    console.log(formation);
    return formation;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateformation = async (id, data) => {
  try {
    const updated = await prisma.formation.update({
      where: { id },
      data,
    });
    console.log("formation mise à jour :", updated);
    return updated;
  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error);
    throw error;
  }
};

const createformation = async (data) => {
  try {
    const formation = await prisma.formation.create({
      data,
    });

    console.log(formation);
    return formation;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteformationById = async (id) => {
  try {
    const formation = await prisma.formation.delete({
      where: {
        id: id,
      },
    });
    console.log(formation);
    return formation;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default {
  getformations,
  getformationById,
  updateformation,
  createformation,
  deleteformationById,
};
