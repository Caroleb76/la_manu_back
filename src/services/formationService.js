import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getFormations = async () => {
  try {
    const formations = await prisma.formation.findMany();
    const total = await prisma.formation.count();

    return { formations, total };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getFormationById = async (id) => {
  try {
    const formation = await prisma.formation.findUnique({
      where: {
        id: id,
      },
    });
    if (!formation) {
      throw new Error("aucune formation trouvée");
    }
    return formation;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateFormation = async (id, data) => {
  try {
    const updated = await prisma.formation.update({
      where: { id },
      data,
    });
    return updated;
  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error);
    throw error;
  }
};

const createFormation = async (data) => {
  try {
    const formation = await prisma.formation.create({
      data,
    });

    return formation;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteFormationById = async (id) => {
  try {
    const formation = await prisma.formation.destroy({
      where: {
        id: id,
      },
    });
    return formation;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const allFormationByFormateurId = async (userId) => {
  try {
    const contracts = await prisma.contract.findMany({
      where: {
        userId: userId,
      },
      include: {
        SessionFormation: {
          include: {
            Formation: true,
          },
        },
      },
    });
    const formations = contracts.map(
      (contract) => contract.SessionFormation.Formation,
    );
    const uniqueFormations = Array.from(
      new Map(formations.map((f) => [f.id, f])).values(),
    );

    return uniqueFormations;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default {
  getFormations,
  getFormationById,
  updateFormation,
  createFormation,
  deleteFormationById,
  allFormationByFormateurId,
};
