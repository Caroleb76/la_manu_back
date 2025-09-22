import prisma from "../../src/utils/prisma.js";

export const defaultExtraCostsCategories = [
    {
 
        name: "Repas",
    },
    {

        name: "Trajet",
    },
    {

        name: "Category",
    },
];

export async function createExtraCostCategorySeeds(extraCostCategory) {
    const createdExtraCostCategory = await prisma.extraCostCategory.create({
        data: {
            name : extraCostCategory.name,
        },
    });
    return createdExtraCostCategory;
}
