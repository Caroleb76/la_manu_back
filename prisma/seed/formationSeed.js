import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const defaultFormations = [
    {
        name: "Formation Dévelopement Web",
        description:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit fugiat ipsa, quos ipsam porro, reiciendis itaque eos dolore iste nisi incidunt in aspernatur inventore architecto? Veniam voluptate placeat deleniti optio.",
    },
    {
        name: "Formation Design",
        description:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit fugiat ipsa, quos ipsam porro, reiciendis itaque eos dolore iste nisi incidunt in aspernatur inventore architecto? Veniam voluptate placeat deleniti optio.",
    },
    {
        name: "Formation Management",
        description:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit fugiat ipsa, quos ipsam porro, reiciendis itaque eos dolore iste nisi incidunt in aspernatur inventore architecto? Veniam voluptate placeat deleniti optio.",
    },
];

export async function createFormationSeeds(formation) {
    const createdContract = await prisma.formation.create({
        data: {
            name: formation.name,
            description: formation.description,
        },
    });
    return createdContract;
}
