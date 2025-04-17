
import { PrismaClient } from '@prisma/client';
import userService from './userService';
import { ROLES } from '../utils/constants';
const prisma = new PrismaClient();

const getByContractId = async (contractId) => {
    const interventions = await prisma.intervention.findMany({
        where: {
            contractId: contractId
        }
    });
    return interventions || [];
}

const create = async (data) => {
    try {
        validateCreation(data);
        const intervention = await prisma.intervention.create({
            data
        });
        return intervention;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const update = async (id, data) => {
    try {
        const exists = await prisma.intervention.findUnique({
            where: { id }
        });

        if (!exists) {
            throw new Error("C'est impossible de mettre à jour une intervention qui n'existe pas");
        }

        const intervention = await prisma.intervention.update({
            where: { id },
            data
        });

        return intervention;
    } catch (error) {
        log.error(error);
        throw error;
    }
};


const destroy = async (id) => {
    try {
        const intervention = await prisma.intervention.delete({
            where: {
                id: id
            }
        });
        return intervention;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const validateIntervention = async (interventionId, userId) => {
    try {
        const intervention = await prisma.intervention.findUnique({
            where: {
                id: interventionId
            }
        });
        if (!intervention) throw new Error("C'est impossible de mettre à jour une intervention qui n'existe pas");
        const user = await userService.getUserById(userId);
        if (user.role !== ROLES.ADMIN && user.role !== ROLES.FORMATEUR) throw new Error("vous n'avez pas les droits");
        if (user.role == ROLES.ADMIN) {
            intervention.validatedByAdmin = user.role == ROLES.ADMIN;
        } else if (user.role == ROLES.FORMATEUR) {
            intervention.validatedByFormateur = user.role == ROLES.FORMATEUR;
        }
        const interventionUpdated = await prisma.intervention.update({
            where: {
                id: interventionId
            },
            data: {
                validatedByAdmin: intervention.validatedByAdmin,
                validatedByFormateur: intervention.validatedByFormateur
            }
        });
        return interventionUpdated;

    } catch (error) {
        console.error(error);
        throw error;
    }
}

const validateCreation = (data) => {
    if (!data) throw new Error("il manque des champs");
    if (!data.contractId) throw new Error("c'est pas possible de créer une intervention sans contrat");
    if (!data.date) throw new Error("c'est pas possible de créer une intervention sans date");
    if (!data.hours) throw new Error("c'est pas possible de créer une intervention sans heures");
    if (!data.shift) throw new Error("c'est pas possible de créer une intervention sans shift");



}

export default {
    getByContractId,
    create,
    update,
    destroy,
    validateIntervention
}