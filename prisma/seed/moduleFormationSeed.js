import prisma from "../../src/utils/prisma.js";

export const defaultModuleFormations = [
    {
        name: "Formation Dévelopement Web",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam modi atque soluta porro placeat vero, ad deserunt earum dolore neque voluptatum. Nostrum autem quas corporis eligendi, eaque consequuntur dolores cumque!",
    },
    {
        name: "Formation Dévelopement Web",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam modi atque soluta porro placeat vero, ad deserunt earum dolore neque voluptatum. Nostrum autem quas corporis eligendi, eaque consequuntur dolores cumque!",
    },
    {
        name: "Formation Dévelopement Web",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam modi atque soluta porro placeat vero, ad deserunt earum dolore neque voluptatum. Nostrum autem quas corporis eligendi, eaque consequuntur dolores cumque!",
    },
];

export async function createModuleFormationSeeds(moduleFormation) {
    const createdModuleFormation = await prisma.moduleFormation.create({
        data: {
            name: moduleFormation.name,
            description: moduleFormation.description,
        },
    });
    return createdModuleFormation;
}
