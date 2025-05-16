import { PrismaClient } from "@prisma/client";
import { ROLES } from "../../src/utils/constants.js";
import utils from "../../src/utils/utils.js";

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
    await createNotifications();
    console.log("database seeded");
}

async function createUsers(roles) {
    let superAdminsEmails = [
        "kenan@demo.com",
        "loic@demo.com",
        "carole@demo.com",
    ];
    let adminsEmails = [
        "admin1@demo.com",
        "admin2@demo.com",
        "admin3@demo.com",
    ];
    let formateurEmails = [
        "formateur1@demo.com",
        "formateur2@demo.com",
        "formateur3@demo.com",
    ];
    const globalPassword = "password";
    const hashedPassword = await utils.hashPassword(globalPassword);
    // creation de SUPER_ADMIN
    for (let email of superAdminsEmails) {
        let currentRole = roles[ROLES.SUPER_ADMIN];
        await createUsersByRole(currentRole.id, email, hashedPassword);
    }

    // creation de ADMIN
    for (let email of adminsEmails) {
        let currentRole = roles[ROLES.ADMIN];
        await createUsersByRole(currentRole.id, email, hashedPassword);
    }

    // creation de FORMATEUR
    for (let email of formateurEmails) {
        let currentRole = roles[ROLES.FORMATEUR];
        await createUsersByRole(currentRole.id, email, hashedPassword);
    }
}

async function createUsersByRole(role, email, password) {
    await prisma.user.upsert({
        where: { email: email },
        update: {},
        create: {
            email: email,
            password: password,
            roleId: role,
            firstName: email.split("@")[0],
        },
    });
}

//  id        String   @id @default(uuid())
//   title     String
//   content   String?
//   priority  Int      @default(1)
//   startDate DateTime?
//   endDate   DateTime?

async function createNotifications() {
    await prisma.notification.createMany({
        data: [
            {
                title: "Notification 1",
                content: "Description de la notification 1",
                priority: 1,
                startDate: new Date("2023-01-01"),
                endDate: new Date("2023-01-31"),
            },
            {
                title: "Notification 2",
                content: "Description de la notification 2",
                priority: 2,
                startDate: new Date("2023-02-01"),
                endDate: new Date("2023-02-25"),
            },
        ],
    });
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
