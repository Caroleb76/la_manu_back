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
        });
        return extraCost;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const updateExtraCostById = async (id, data) => {
    try {
        const updated = await prisma.extraCost.update({
            where: { id },
            data,
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
const totalMonthly = async (date) => {
  // TODO : finish this
    try {
        const dayJsDate = dayjs(date);
        const year = dayJsDate.year();
        const month = dayJsDate.month();

        const extraCosts = await prisma.extraCost.findMany({
            where: {
                createdAt: {
                    gte: new Date(year, month, 1),
                    lte: new Date(year, month + 1, 1),
                },
            },
        });

        return extraCosts.reduce((total, extraCost) => {
            return total + extraCost.val;
        })
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
    totalMonthly,
};
