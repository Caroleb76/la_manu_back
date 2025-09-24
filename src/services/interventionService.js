import { PrismaClient } from "@prisma/client";
import userService from "./userService.js";
import { ROLES } from "../utils/constants.js";
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
  return interventions || [];
};

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
        validatedByAdmin: intervention.validatedByAdmin,
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
    throw new Error("c'est pas possible de créer une intervention sans date");
  if (!data.hours)
    throw new Error("c'est pas possible de créer une intervention sans heures");
  if (!data.shift)
    throw new Error("c'est pas possible de créer une intervention sans shift");
};

export default {
  getByContractId,
  create,
  update,
  destroy,
  validateIntervention,
  createMany,
  getAll,
  getByUserId,
  getByFormationandUserId
};
