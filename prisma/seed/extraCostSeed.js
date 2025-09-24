import prisma from "../../src/utils/prisma.js";

export const defaultExtraCosts = [
    {
 
        val: 0.15,
    },
    {

        val: 12,
    },
    {

        val: 15,
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
