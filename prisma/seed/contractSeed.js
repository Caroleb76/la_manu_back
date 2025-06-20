import prisma from "../../src/utils/prisma.js";


export const defaultContracts = [
    {
        startDate: new Date("2025-06-01"),
        endDate: new Date("2025-06-30"),
        signed: false,
        declared: false,
    },
    {
        startDate: new Date("2025-07-01"),
        endDate: new Date("2025-07-31"),
        signed: true,
        declared: false,
    },
    {
        startDate: new Date("2025-08-01"),
        endDate: new Date("2025-08-31"),
        signed: true,
        declared: true,
    },
];

export async function createContractSeeds(contract, sessionFormation, user) {
    const createdContract = await prisma.contract.create({
        data: {
            startDate: contract.startDate,
            endDate: contract.endDate,
            signed: contract.signed,
            declared: contract.declared,
            sessionFormationId: sessionFormation.id,
            userId: user.id,
        },

    });
    return createdContract;
}


