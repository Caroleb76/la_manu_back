import { PrismaClient } from "@prisma/client";
import fileService from "./fileService.js";
import dayjs from "dayjs";

const prisma = new PrismaClient();

const getExtraCosts = async () => {
  try {
    const extraCosts = await prisma.extraCost.findMany();

    return extraCosts;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getExtraCostsByInterventionId = async (interventionId) => {
  try {
    const extraCosts = await prisma.extraCost.findMany({
      where: {
        interventionId: interventionId,
      },
      include: {
        files: true,
        category: true,
      },
    });

    return extraCosts;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getExtraCostById = async (id) => {
  try {
    const extraCost = await prisma.extraCost.findUnique({
      where: {
        id: id,
      },
      include: {
        files: true,
        category: true,
      },
    });
    return extraCost;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateExtraCostById = async (id, data) => {
  try {
    const { val, ...rest } = data;
    const updated = await prisma.extraCost.update({
      where: { id },
      data: {
        val: val,
      },
    });
    return updated;
  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error);
    throw error;
  }
};

const createExtraCost = async (data) => {
  try {
    const extraCost = await prisma.extraCost.create({
      data,
    });

    return extraCost;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteExtraCostById = async (id) => {
  try {
    const file = await prisma.file.findFirst({
      where: { extraCostId: id },
    });
    await fileService.deleteFileById(file.id, true);
    const extraCost = await prisma.extraCost.delete({
      where: {
        id: id,
      },
    });
    return extraCost;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// le total des extracosts du mois,
const getTotalAmountPerMonth = async (date) => {
  //TODO : vérifier si les valeurs sont des km (à multiplier par le frais par km)
  try {
    const dayJsDate = dayjs(date);
    const year = dayJsDate.year();
    const month = dayJsDate.month();

    //Get all extraCosts & check the date of their interventions

    const extraCosts = await prisma.extraCost.findMany({
      include: {
        intervention: true,
      },
      where: {
        intervention: {
          dateIntervention: {
            gte: new Date(year, month, 1),
            lte: new Date(year, month + 1, 1),
          },
        },
      },
    });

    let total = 0;
    for (const extraCost of extraCosts) {
      total += parseInt(extraCost.val);
    }

    return {
      totalAmount: total,
      count: extraCosts.length,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default {
  getExtraCosts,
  getExtraCostsByInterventionId,
  getExtraCostById,
  updateExtraCostById,
  createExtraCost,
  deleteExtraCostById,
  getTotalAmountPerMonth,
};
