import { toIsoDate, toStandardDate } from "../utils/date.js";
import userService from "./userService.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getById = async (contractId) => {
    console.log("GETBYID");
    try {
        const contract = await prisma.contract.findUnique({
            where: {
                id: contractId,
            },
            include: {
                User: {
                    include: {
                        address: true,
                    },
                },

                SessionFormation: {
                    include: {
                        Formation: true,
                    },
                },
                interventions: {
                    include: {
                        ModuleFormation: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                        InterventionCategory: true,
                    },
                },
            },
        });
        return contract || {};
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// const getByUserId = async (userId) => {
//      console.log("GETONEBYUSERID : userId", userId);
//     try {
//         // await userService.getUserById(userId);
//         const contract = await prisma.contract.findMany({
//             where: {
//                 userId: userId,
//             },
//         });
//         return contract || [];
//     } catch (error) {
//         console.error(error);
//         throw error;
//     }
// };

const getBySessionId = async (id) => {
    console.log("GETBy_SESSION_ID");

    try {
        const contracts = await prisma.contract.findMany({
            where: {
                sessionFormationId: id,
            },
        });
        return contracts;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getByUserId = async (id) => {
    console.log("GET_BY_USER_ID");

    try {
        const contracts = await prisma.contract.findMany({
            where: {
                userId: id,
            },
            include: {
                SessionFormation: {
                    include: {
                        Formation: true,
                    },
                },
            },
        });
        return contracts;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getAll = async (
    filter = {},
    offset = 0,
    limit = 10,
    searchText = null
) => {
    try {
        let where = {};
        if (searchText) {
            where.OR = [
                {
                    User: {
                        email: {
                            contains: searchText,
                            mode: "insensitive",
                        },
                    },
                },
                {
                    User: {
                        firstName: {
                            contains: searchText,
                            mode: "insensitive",
                        },
                    },
                },
                {
                    User: {
                        lastName: {
                            contains: searchText,
                            mode: "insensitive",
                        },
                    },
                },
                {
                    SessionFormation: {
                        Formation: {
                            name: {
                                contains: searchText,
                                mode: "insensitive",
                            },
                        },
                    },
                },
            ];
        }
        if (filter) {
            if (filter.userId) {
                where.userId = filter.userId;
            }
        }
        const contracts = await prisma.contract.findMany({
            where: where,
            skip: offset,
            take: limit,
            include: {
                User: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },

                SessionFormation: {
                    include: {
                        Formation: true,
                    },
                },
                interventions: {
                    select: {
                        id: true,
                        dateIntervention: true,
                        hours: true,
                        validatedByAdmin: true,
                        validatedByFormateur: true,
                    },
                },
            },

            orderBy: {
                startDate: "desc",
            },
        });
        for (let contract of contracts) {
            const interventionTotalHoursStr = contract.interventions.reduce(
                (total, intervention) =>
                    parseFloat(total) + parseFloat(intervention.hours),
                0
            );
            // const interventionTotalHours = parseFloat(interventionTotalHoursStr);
            contract.totalHours = interventionTotalHoursStr;
        }
        const total = await prisma.contract.count({ where });
        return { contracts, total };
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const create = async (data) => {
    try {
        // Expected ISO-8601 DateTime
        const formattedStartDate = toStandardDate(data.startDate);
        const formattedEndDate = toStandardDate(data.endDate);
        const isoStartDate = new Date(formattedStartDate).toISOString();
        const isoEndDate = new Date(formattedEndDate).toISOString();

        validate(data);

        let formattedInterventions = [];
        data.interventions.forEach((intervention) => {
            // let extraCostsArray = intervention.extraCosts.map(extraCost => ({ id: extraCost }));

            const formattedDateIntervention = toStandardDate(
                intervention.dateIntervention
            );
            const formattedIntervention = {
                dateIntervention: new Date(formattedDateIntervention),
                hours: intervention.hours,
                shift: intervention.shift,
                description: intervention.description,
                validatedByFormateur: false,
                validatedByAdmin: false,
                interventionCategoryId: intervention.InterventionCategory.id,
                moduleFormationId: intervention.ModuleFormation.id,
                extraCosts: intervention.extraCosts,
            };
            formattedInterventions.push(formattedIntervention);
        });

        const contract = await prisma.contract.create({
            data: {
                startDate: isoStartDate,
                endDate: isoEndDate,
                signed: false,
                declared: false,
                sessionFormationId: data.sessionId,
                userId: data.formateurId,
                interventions: {
                    create: formattedInterventions.map((intervention) => ({
                        ...intervention,
                        extraCosts: {
                            create: intervention.extraCosts.map((cost) => ({
                                ...cost,
                                val: parseInt(cost.val, 10), // conversion explicite en int
                            })),
                        },
                    })),
                },
            },
        });

        console.log(`[+] contract created successfully`, contract);

        return contract;
    } catch (error) {
        console.error(`[-] create contract error`, error);
        throw error;
    }
};
//TODO: we should define restrictions and constraints on contracts modifications
const update = async (id, data) => {
    try {
        const exists = await prisma.contract.findUnique({
            where: { id },
        });

        if (!exists)
            throw new Error(
                "C'est impossible de mettre a jour un contrat qui n'existe pas"
            );
        const contract = await prisma.contract.update({
            where: {
                id: id,
            },
            data,
        });
        return contract;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const destroy = async (id) => {
    try {
        const exists = await prisma.contract.findUnique({
            where: { id },
        });

        if (!exists)
            throw new Error(
                "C'est impossible de mettre a jour un contrat qui n'existe pas"
            );
        const contract = await prisma.contract.destroy({
            where: {
                id: id,
            },
        });
        return contract;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const validate = (contractData) => {
    if (!contractData.formateurId)
        throw new Error("Il faut renseigner un utilisateur");
    if (!contractData.startDate)
        throw new Error("Il faut renseigner une date de debut");
    if (!contractData.endDate)
        throw new Error("Il faut renseigner une date de fin");
    let startDate, endDate;
    try {
        startDate = new Date(contractData.startDate);
        endDate = new Date(contractData.endDate);
        contractData.startDate = startDate;
        contractData.endDate = endDate;
        console.log("from validate Contract", startDate, endDate);

        // if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        //   throw new Error("Format de date invalide");
        // }
    } catch (error) {
        throw new Error("La date est incorrecte: " + error.message);
    }

    if (startDate > endDate) {
        throw new Error(
            "La date de fin doit être supérieure a la date de début"
        );
    }
    console.log(`[+] contract validated successfully`);
};

const sign = async (id) => {
    try {
        const exists = await prisma.contract.findUnique({
            where: { id },
        });

        if (!exists)
            throw new Error(
                "C'est impossible de signer un contrat qui n'existe pas"
            );
        const contract = await prisma.contract.update({
            where: {
                id: id,
            },
            data: {
                signed: true,
            },
        });
        return contract;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default {
    getById,
    getBySessionId,
    getByUserId,
    getAll,
    create,
    update,
    destroy,
    sign,
    validate,
};
