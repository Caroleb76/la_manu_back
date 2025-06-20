import prisma from "../../src/utils/prisma.js";


export const defaultAddresses = [
    {
        address : "11 place leon meyer",
        postalCode : "76600",
        city : "Le Havre"
    },
    {
        address : "12 rue de Paris",
        postalCode : "76000",
        city : "Rouen"
    },
    {
        address : "11 place de la gare",
        postalCode : "14000",
        city : "Caen"
    },
];

export async function createAddressSeeds(address) {
    const createdAddress = await prisma.address.create({
        data: {
            address : address.address,
            postalCode : address.postalCode,
            city : address.city
        },
    });
    return createdAddress;
}
