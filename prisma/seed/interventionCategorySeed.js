import prisma from "../../src/utils/prisma.js";

export const defaultInterventionCategories = [
    {
        name: "Cours magistral",
        rate: 26,
    },
    {
        name: "Correction de copie",
        rate: 4.5,
    },
    {
        name: "Réunion",
        rate: 12.5,
    },
];

export async function createInterventionCategorySeeds(interventionCategory) {
    const createdInterventionCategory = await prisma.interventionCategory.create({
        data: {
            name: interventionCategory.name,
            rate: interventionCategory.rate,
        },
    });
    return createdInterventionCategory;
}
