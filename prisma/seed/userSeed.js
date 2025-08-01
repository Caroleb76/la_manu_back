import utils from "../../src/utils/utils.js";
import prisma from "../../src/utils/prisma.js";
import roleService from "../../src/services/roleService.js";
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
        phone: "06 22 36 39",
        socialSecurity: "123456789123456",
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
        phone: "06 22 36 39",
        socialSecurity: "123456789123456",
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
        phone: "06 22 36 39",
         socialSecurity: "123456789123456",
        gender: "madame",
        diploma: "BAC+5",
    },
];

export let defaultSuperAdmins = [
    {
        email: "superAdmin@demo.com",
        password: hashedPassword,
        birthDate: new Date("1990-01-01"),
        birthName: "Dupont",
        birthPlace: "Le Havre",
        permisB: true,
        mutuelle: true,
        employer: "ifen",
        occupation: "secrétaire",
        firstName: "Jean",
        lastName: "Superadmin",
        phone: "06 22 36 39",
        socialSecurity: "123456789123456",
        gender: "madame",
        diploma: "BAC+3",
    },
    {
        email: "superAdmin2@demo.com",
        password: hashedPassword,
        birthDate: new Date("1993-02-02"),
        birthName: "Leblond",
        birthPlace: "Rouen",
        permisB: false,
        mutuelle: true,
        employer: "Veoneer",
        occupation: "développeur",
        firstName: "Antoine",
        lastName: "Superadmin",
        phone: "06 22 36 39",
        socialSecurity: "123456789123456",
        gender: "monsieur",
        diploma: "DUT",
    },
    {
        email: "superadmin3@demo.com",
        password: hashedPassword,
        birthDate: new Date("1995-03-03"),
        birthName: "Hébert",
        birthPlace: "Caen",
        permisB: true,
        mutuelle: true,
        employer: "Safran",
        occupation: "technicienne",
        firstName: "Julie",
        lastName: "Superadmin",
        phone: "06 22 36 39",
         socialSecurity: "123456789123456",
        gender: "madame",
        diploma: "BAC+5",
    },
];

export let defaultAdmins = [
    {
        email: "admin@demo.com",
        password: hashedPassword,
        birthDate: new Date("1990-01-01"),
        birthName: "Dupont",
        birthPlace: "Le Havre",
        permisB: true,
        mutuelle: true,
        employer: "ifen",
        occupation: "secrétaire",
        firstName: "Michel",
        lastName: "Admin",
        phone: "06 22 36 39",
        socialSecurity: "123456789123456",
        gender: "monsieur",
        diploma: "BAC+3",
    },
    {
        email: "admin2@demo.com",
        password: hashedPassword,
        birthDate: new Date("1993-02-02"),
        birthName: "Leblond",
        birthPlace: "Rouen",
        permisB: false,
        mutuelle: true,
        employer: "Veoneer",
        occupation: "développeur",
        firstName: "Sylvie",
        lastName: "Admin",
        phone: "06 22 36 39",
        socialSecurity: "123456789123456",
        gender: "madame",
        diploma: "DUT",
    },
    {
        email: "admin3@demo.com",
        password: hashedPassword,
        birthDate: new Date("1995-03-03"),
        birthName: "Hébert",
        birthPlace: "Caen",
        permisB: true,
        mutuelle: true,
        employer: "Safran",
        occupation: "technicienne",
        firstName: "Justine",
        lastName: "Admin",
        phone: "06 22 36 39",
         socialSecurity: "123456789123456",
        gender: "madame",
        diploma: "BAC+5",
    },
];

export let defaultFormateurs = [
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
        firstName: "Etienne",
        lastName: "Formateur",
        phone: "06 22 36 39",
        socialSecurity: "123456789123456",
        gender: "monsieur",
        diploma: "BAC+3",
    },
    {
        email: "formateur2@demo.com",
        password: hashedPassword,
        birthDate: new Date("1993-02-02"),
        birthName: "Leblond",
        birthPlace: "Rouen",
        permisB: false,
        mutuelle: true,
        employer: "Veoneer",
        occupation: "développeur",
        firstName: "Nicolas",
        lastName: "Formateur",
        phone: "06 22 36 39",
        socialSecurity: "123456789123456",
        gender: "monsieur",
        diploma: "DUT",
    },
    {
        email: "formateur3@demo.com",
        password: hashedPassword,
        birthDate: new Date("1995-03-03"),
        birthName: "Hébert",
        birthPlace: "Caen",
        permisB: true,
        mutuelle: true,
        employer: "Safran",
        occupation: "technicienne",
        firstName: "Léa",
        lastName: "Formateur",
        phone: "06 22 36 39",
         socialSecurity: "123456789123456",
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
            socialSecurity: user.socialSecurity,
            gender: user.gender,
            diploma: user.diploma,
            addressId: address.id,
        },
    });
    return createdUser;
}




export async function createSuperAdminSeeds(user,address) {
    const superAdminRole = await roleService.getRoleByName("SUPER_ADMIN");


    const createdUser = await prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: {
            email: user.email,
            password: user.password,
            roleId: superAdminRole.id,
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
            socialSecurity: user.socialSecurity,
            gender: user.gender,
            diploma: user.diploma,
            addressId: address.id,
        },
    });
    return createdUser;
}

export async function createAdminSeeds(user, address) {
        const adminRole = await roleService.getRoleByName("ADMIN");

    const createdUser = await prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: {
            email: user.email,
            password: user.password,
            roleId: adminRole.id,
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
            socialSecurity: user.socialSecurity,
            gender: user.gender,
            diploma: user.diploma,
            addressId: address.id,
        },
    });
    return createdUser;
}


export async function createFormateurSeeds(user, address) {
      const formateurRole = await roleService.getRoleByName("FORMATEUR");

    const createdUser = await prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: {
            email: user.email,
            password: user.password,
            roleId: formateurRole.id,
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
            socialSecurity: user.socialSecurity,
            gender: user.gender,
            diploma: user.diploma,
            addressId: address.id,
        },
    });
    return createdUser;
}

