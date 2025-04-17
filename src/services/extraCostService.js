import { prismaClient } from "@prisma/client";

const prisma = new prismaClient();

const getExtraCosts = async () => {
    try {
        const extraCosts = await prisma.extraCost.findMany();

        console.log(extraCosts);
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
        });

        console.log(extraCosts);
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
        console.log(extraCost);
        return extraCost;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const updateExtraCost = async (id, data) => {
    try {
        const updated = await prisma.extraCost.update({
            where: { id },
            data,
        });
        console.log("extraCost mise à jour :", updated);
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

        console.log(extraCost);
        return extraCost;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const deleteExtraCostById = async (id) => {
    try {
        const extraCost = await prisma.extraCost.delete({
            where: {
                id: id,
            },
        });
        console.log(extraCost);
        return extraCost;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default {
    getExtraCosts,
    getExtraCostsByInterventionId,
    getExtraCostById,
    updateExtraCost,
    createExtraCost,
    deleteExtraCostById,
};
