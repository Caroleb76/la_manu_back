import prisma from "../../src/utils/prisma.js";

export const defaultInterventions = [
    {
        dateIntervention: new Date("2025-01-01"),
        hours: 4.5,
        shift: "matin",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam modi atque soluta porro placeat vero, ad deserunt earum dolore neque voluptatum. Nostrum autem quas corporis eligendi, eaque consequuntur dolores cumque!",
        validatedByFormateur: false,
        validatedByAdmin: false,
    },
    {
        dateIntervention: new Date("2025-05-01"),
        hours: 3.5,
        shift: "apres-midi",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam modi atque soluta porro placeat vero, ad deserunt earum dolore neque voluptatum. Nostrum autem quas corporis eligendi, eaque consequuntur dolores cumque!",
        validatedByFormateur: false,
        validatedByAdmin: true,
    },
    {
        dateIntervention: new Date("2025-09-01"),
        hours: 7,
        shift: "journée",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam modi atque soluta porro placeat vero, ad deserunt earum dolore neque voluptatum. Nostrum autem quas corporis eligendi, eaque consequuntur dolores cumque!",
        validatedByFormateur: true,
        validatedByAdmin: true,
    },
];

export async function createInterventionSeeds(
    intervention,
    contract,
    interventionCategory,
    moduleFormation
) {
    const createdIntervention = await prisma.intervention.create({
        data: {
            dateIntervention: intervention.dateIntervention,
            hours: intervention.hours,
            shift: intervention.shift,
            description: intervention.description,
            validatedByFormateur: intervention.validatedByFormateur,
            validatedByAdmin: intervention.validatedByAdmin,

            contractId: contract.id,
            interventionCategoryId: interventionCategory.id,
            moduleFormationId: moduleFormation.id,
        },
    });
    return createdIntervention;
}
