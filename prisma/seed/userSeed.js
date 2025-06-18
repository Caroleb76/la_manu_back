import { ROLES } from "../../src/utils/constants.js";
import utils from "../../src/utils/utils.js";
import { PrismaClient, GenderEnum } from "@prisma/client";

const prisma = new PrismaClient();
const globalPassword = "password";
const hashedPassword = await utils.hashPassword(globalPassword);
let userTemplate = {
    email: 'formateur_test@demo.com',
    password: hashedPassword,
    birthDate: new Date('1990-01-01'),
    birthName: 'Dupont',
    birthPlace: 'Le Havre',
    permisB: true,
    mutuelle: true,
    employer: 'ifen',
    occupation: 'secrétaire',
    firstName: 'Carole',
    lastName: 'Durand',
    phone: '06 22 36 39 38',
    gender: GenderEnum.femme,
    diploma: 'BAC+3',

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
    userTemplate.password = hashedPassword
    // creation de SUPER_ADMIN
    for (let email of superAdminsEmails) {
        let currentRole = roles[ROLES.SUPER_ADMIN];
        userTemplate.email = email
        userTemplate.roleId = currentRole.id

        await createUsersWithRole(userTemplate);
    }

    // creation de ADMIN
    for (let email of adminsEmails) {
        let currentRole = roles[ROLES.ADMIN];
       userTemplate.email = email
        userTemplate.roleId = currentRole.id

        await createUsersWithRole(userTemplate);
    }

    // creation de FORMATEUR
    for (let email of formateurEmails) {
        let currentRole = roles[ROLES.FORMATEUR];
        userTemplate.email = email
        userTemplate.roleId = currentRole.id

        await createUsersWithRole(userTemplate);
    }
}

export async function createUsersByRole(role, email, password) {
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

export async function createUsersWithRole(user) {
    await prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: {...user,firstName: user.email.split("@")[0],},

    });
}


export default createUsers;
