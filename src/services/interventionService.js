import { PrismaClient } from "@prisma/client";
import userService from "./userService.js";
import { ROLES } from "../utils/constants.js";
import dayjs from "dayjs";
const prisma = new PrismaClient();

const getAll = async () => {
    const interventions = await prisma.intervention.findMany({
        include: {
            Contract: {
                include: {
                    User: true,
                },
            },
            ModuleFormation: true,
            InterventionCategory: true,
        },
    });
    console.log(interventions);
    return interventions || [];
};

const getById= async (id) => {
    return prisma.intervention.findUnique({
        where: {
            id,
        },
        include: {
            Contract: {
                include: {
                    User: true,
                },
            },
            ModuleFormation: true,
            InterventionCategory: true,
            extraCosts: {
                include: {
                    files: true,
                },
            },
        },
    });
}

const getByContractId = async (contractId) => {
    const interventions = await prisma.intervention.findMany({
        where: {
            contractId: contractId,
        },
        include: {
            InterventionCategory: true,
            ModuleFormation: true,
        },
    });

    return interventions || [];
};

const getByUserId = async (userId) => {
    //Get all user contract
    const contracts = await prisma.contract.findMany({
        where: {
            userId: userId,
        },
    });
    const interventions = await prisma.intervention.findMany({
        where: {
            contractId: {
                in: contracts.map((contract) => contract.id),
            },
        },
        include: {
            Contract: {
                include: {
                    User: true,
                },
            },
            ModuleFormation: true,
            InterventionCategory: true,
        },
    });

    return interventions || [];
};

const create = async (data) => {
    try {
        validateCreation(data);
        const intervention = await prisma.intervention.create({
            data,
        });
        return intervention;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const createMany = async (data) => {
    try {
        // todo validate with ZOD
        const createdInterventions = await prisma.intervention.createMany({
            data,
        });
        return createdInterventions;
    } catch (error) {
        console.error(error);
        throw error;
    }
};


const getByFormationandUserId = async (formationId, userId) => {
  try {
    const interventions = await prisma.intervention.findMany({
      where: {
        Contract: {
          userId: userId,
          SessionFormation: {
            Formation: {
              id: formationId,
            },
          },
        },

      },
      include: {
        InterventionCategory: true,
        ModuleFormation: true,
      },
    });
    return interventions || [];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const update = async (id, data) => {
    try {
        const exists = await prisma.intervention.findUnique({
            where: { id },
        });

        if (!exists) {
            throw new Error(
                "C'est impossible de mettre à jour une intervention qui n'existe pas"
            );
        }

        const intervention = await prisma.intervention.update({
            where: { id },
            data,
        });

        return intervention;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const destroy = async (id) => {
    try {
        const intervention = await prisma.intervention.destroy({
            where: {
                id: id,
            },
        });
        return intervention;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const validateIntervention = async (interventionId, user) => {
    try {
        console.log(interventionId, user);

        if (!interventionId || !user) throw new Error("il manque des champs");
        const userRole = user.role.name;
        const intervention = await prisma.intervention.findUnique({
            where: {
                id: interventionId,
            },
        });
        if (!intervention)
            throw new Error(
                "C'est impossible de mettre à jour une intervention qui n'existe pas"
            );
        if (userRole !== ROLES.ADMIN && userRole !== ROLES.FORMATEUR)
            throw new Error("vous n'avez pas les droits");
        if (userRole == ROLES.ADMIN) {
            intervention.validatedByAdmin = userRole == ROLES.ADMIN;
        } else if (userRole == ROLES.FORMATEUR) {
            intervention.validatedByFormateur = userRole == ROLES.FORMATEUR;
        }
        const interventionUpdated = await prisma.intervention.update({
            where: {
                id: interventionId,
            },
            data: {
                validatedByFormateur: intervention.validatedByFormateur,
            },
        });
        return interventionUpdated;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const validateCreation = (data) => {
    if (!data) throw new Error("il manque des champs");
    if (!data.contractId)
        throw new Error(
            "c'est pas possible de créer une intervention sans contrat"
        );
    if (!data.dateIntervention)
        throw new Error(
            "c'est pas possible de créer une intervention sans date"
        );
    if (!data.hours)
        throw new Error(
            "c'est pas possible de créer une intervention sans heures"
        );
    if (!data.shift)
        throw new Error(
            "c'est pas possible de créer une intervention sans shift"
        );
};

// nombre d'heures par catégorie d'intervention
// On additionne les heures
const getTotalHoursPerCategory = async () => {
    try {
        //_On récupère toutes les interventions

        const interventionCategories =
            await prisma.interventionCategory.findMany({
                include: {
                    interventions: true,
                },
            });

        const interventions = await prisma.intervention.findMany({
            include: {
                InterventionCategory: true,
            },
        });

        // On trie par catégorie d'intervention
        const interventionCategoriesWithHours = interventionCategories.map(
            (category) => {
                const categoryHours = interventions
                    .filter(
                        (intervention) =>
                            intervention.interventionCategoryId === category.id
                    )
                    .reduce((total, intervention) => parseFloat(total) + parseFloat(intervention.hours), 0);
                return {
                    id: category.id,
                    name: category.name,
                    rate: category.rate,
                    hours: categoryHours.toFixed(1),
                };
            }
        );

        return interventionCategoriesWithHours;
    } catch (error) {
        console.error(error);
        throw error;
    }
};


// le montant total des interventions du mois
const getTotalAmountPerMonth = async (date) => {
    try {
        const dayJsDate = dayjs(date);
        const year = dayJsDate.year();
        const month = dayJsDate.month();
        
        //récupérer interventions du mois
        const monthlyInterventions = await prisma.intervention.findMany({
            where: {
                dateIntervention: {
                    gte: new Date(year, month, 1),
                    lte: new Date(year, month + 1, 1),
                },
            },
            include: {
                InterventionCategory: true,
            },
        });
        if (!monthlyInterventions) {
            throw new Error("aucune intervention pour ce mois");
        }

        //pour chaque intervention on additionne les heures
        // Pour chaque intervention on multiplie les heures par le tarif de la catégorie
        const totalAmount = monthlyInterventions.reduce((total, intervention) => {
            return total + intervention.hours * intervention.InterventionCategory.rate;
        }, 0);

        return {
            totalAmount: parseFloat(totalAmount).toFixed(1),
            count: monthlyInterventions.length,
        };
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const validatePayment = async (interventionId) => {
    try {
        const exists = await prisma.intervention.findUnique({
            where: {
                id: interventionId,
            },
        })
        if (!exists) {
            throw new Error(
                "Impossible de mettre à jour une intervention qui n'existe pas"
            );
        }

         const valueResponse = await prisma.intervention.findUnique({
            select : {
                id: true,
                validatedByAdmin: true
            },
            where: {
                id: interventionId,
            },
        })

        let toggledValidated = !valueResponse.validatedByAdmin
      

        const response = await prisma.intervention.update({
            where: {
                id: interventionId,
            },
            data: {
                validatedByAdmin: toggledValidated ,
            },
        })
        return response
    } catch (error) {
        console.error(error);
        throw error;
    }
}
    
export default {
    getByContractId,
    getById,
    create,
    update,
    destroy,
    validateIntervention,
    validatePayment,
    createMany,
    getAll,
    getByUserId,
    getTotalHoursPerCategory,
    getTotalAmountPerMonth,
  getByFormationandUserId
};
