import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const roleAdmin = await prisma.role.upsert({
        where: { name: "ADMIN" },
        update: {},
        create: {
           name: "ADMIN"
        },
    });

    const roleSuperadmin = await prisma.role.upsert({
        where: { name: "SUPER_ADMIN" },
        update: {},
        create: {
           name: "SUPER_ADMIN"
        },
    });

    const roleFormateur = await prisma.role.upsert({
        where: { name: "FORMATEUR" },
        update: {},
        create: {
           name: "FORMATEUR"
        },
    });

    console.log("database seeded")
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
