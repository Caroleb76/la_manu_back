import utils from "../../src/utils/utils.js";
import prisma from "../../src/utils/prisma.js";

const globalPassword = "password";
const hashedPassword = await utils.hashPassword(globalPassword);

export let defaultUsers = [
    {
        email: "formateur@demo.com",
        password: hashedPassword,
        birthDate: new Date("1990-01-01"),
        birthName: "Dupont",
        birthPlace: "Le Havre",
        permisB: true,
        mutuelle: true,
        employer: "ifen",
        occupation: "secrétaire",
        firstName: "Carole",
        lastName: "Durand",
        phone: "06 22 36 39 38",
        gender: "madame",
        diploma: "BAC+3",
    },
    {
        email: "admin@demo.com",
        password: hashedPassword,
        birthDate: new Date("1993-02-02"),
        birthName: "Leblond",
        birthPlace: "Rouen",
        permisB: false,
        mutuelle: true,
        employer: "Veoneer",
        occupation: "développeur",
        firstName: "Julin",
        lastName: "Leblond",
        phone: "06 22 36 39 38",
        gender: "monsieur",
        diploma: "DUT",
    },
    {
        email: "superadmin@demo.com",
        password: hashedPassword,
        birthDate: new Date("1995-03-03"),
        birthName: "Hébert",
        birthPlace: "Caen",
        permisB: true,
        mutuelle: true,
        employer: "Safran",
        occupation: "technicienne",
        firstName: "Julie",
        lastName: "Hébert",
        phone: "06 22 36 39 38",
        gender: "madame",
        diploma: "BAC+5",
    },
];



export async function createUserSeeds(user,role, address) {
    const createdUser = await prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: {
            email: user.email,
            password: user.password,
            roleId: role.id,
            firstName: user.firstName,
            lastName: user.lastName,
            birthDate: user.birthDate,
            birthName: user.birthName,
            birthPlace: user.birthPlace,
            permisB: user.permisB,
            mutuelle: user.mutuelle,
            employer: user.employer,
            occupation: user.occupation,
            phone: user.phone,
            gender: user.gender,
            diploma: user.diploma,
            addressId: address.id,
        },
    });
    return createdUser;
}

