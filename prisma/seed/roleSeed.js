import prisma from "../../src/utils/prisma.js";
import { ROLES } from "../../src/utils/constants.js";

export const defaultRoles = [
    {
        name: ROLES.ADMIN,
    },
    {
        name: ROLES.FORMATEUR,
    },
    {
        name: ROLES.SUPER_ADMIN,
    },
];

export async function createRoleSeeds(
    role
) {
    const createdRole = await prisma.role.create({
        data: {
            name: role.name,
        },
    });
    return createdRole;
}
