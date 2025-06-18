
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

let formateurTest = {
    email: "formateurTest@demo.com",
    password: hashedPassword,
    birthDate: new Date("1990-01-01"),
    birthName: "Smith",
    birthPlace: "Paris",
    permisB: true,
    mutuelle: true,
    employer: "La Manu",
    occupation: "Formateur",
    firstName: "John",
    lastName: "Smith",
    phone: "1234567890",
    gender: true,
    diploma: "BAC+2",
    addressId: "1",
    roleId: roles[ROLES.FORMATEUR],
};


export default createUsers;