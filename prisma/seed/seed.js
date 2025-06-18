import { PrismaClient } from "@prisma/client";
import { ROLES } from "../../src/utils/constants.js";
import createNotifications from "./notificationSeed.js";
import createUsers from "./userSeed.js";

const prisma = new PrismaClient();

async function main() {
    let createdRoles = {};

    for (let currentKey of Object.keys(ROLES)) {
        var role = ROLES[currentKey];
        let createdRole = await prisma.role.upsert({
            where: { name: role },
            update: {},
            create: {
                name: role,
            },
        });
        createdRoles[currentKey] = createdRole;
    }
    //create users
    await createUsers(createdRoles);
    console.log("users seeded");

    await createNotifications();
    console.log("notifications seeded");

}



main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
