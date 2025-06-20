import prisma from "../../src/utils/prisma.js";

export const defaultExtraCosts = [
    {
        category: "Carburant",
        val: "0.15/km",
    },
    {
        category: "Repas",
        val: "12€/jour",
    },
    {
        category: "Train",
        val: "15€/trajet",
    },
];

export async function createExtraCostSeeds(extraCost, intervention) {
    const createdExtraCost = await prisma.extraCost.create({
        data: {
            category : extraCost.category,
            val : extraCost.val,
            interventionId : intervention.id
        },
    });
    return createdExtraCost;
}
