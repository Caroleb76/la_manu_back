import prisma from "../../src/utils/prisma.js";

export const defaultSessionFormations = [
    {
        serialNumber: "123456789",
        startDate: new Date("2025-01-01"),
        endDate: new Date("2025-03-31"),
    },
    {
        serialNumber: "987654321",
        startDate: new Date("2025-04-01"),
        endDate: new Date("2025-07-31"),
    },
    {
        serialNumber: "12354678",
        startDate: new Date("2025-08-01"),
        endDate: new Date("2025-12-31"),
    },
];

export async function createSessionFormationSeeds(sessionFormation, formation, address) {
    const createdSessionFormation = await prisma.sessionFormation.create({
        data: {
            serialNumber: sessionFormation.serialNumber,
            startDate: sessionFormation.startDate,
            endDate: sessionFormation.endDate,
            formationId: formation.id,
            addressId: address.id
        },
    });
    return createdSessionFormation;
}
