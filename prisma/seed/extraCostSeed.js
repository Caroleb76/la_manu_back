import prisma from "../../src/utils/prisma.js";

export const defaultExtraCosts = [
    {
 
        val: "0.15/km",
    },
    {

        val: "12€/jour",
    },
    {

        val: "15€/trajet",
    },
];

export async function createExtraCostSeeds(extraCost) {
    const createdExtraCost = await prisma.extraCost.create({
        data: {
            category : extraCost.category,
            val : extraCost.val,
        },
    });
    return createdExtraCost;
}
