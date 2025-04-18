
import userService from "./userService.js";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


const getByContractId = async (contractId) => {
    try {
        const contract = await prisma.contract.findUnique({
            where: {
                id: contractId
            }
        });
        return contract || {};
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const getContractByUserId = async (userId) => {
    try {
        await userService.getUserById(userId);
        const contract = await prisma.contract.findUnique({
            where: {
                userId: userId
            }
        });
        return contract || [];
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const getAllContractsBySessionId = async (id) => {
    try {
        const contracts = await prisma.contract.findMany({
            where: {
                sessionFormationId: id
            }
        });
        return contracts;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const getAll = async (filter={},offset=0,limit=10) => {
    try {
        const contracts = await prisma.contract.findMany(
            {
                where: filter,
                skip: offset,
                take: limit
            }
        );
        return contracts;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const create = async (data) => {
    try {
        validateContract(data);
        const contract = await prisma.contract.create({
            data
        });
        return contract;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
//TODO: we should define restrictions and constraints on contracts modifications 
const update = async (id, data) => {
    try {
        const exists = await prisma.contract.findUnique({
            where: { id }
        });

        if (!exists) throw new Error("C'est impossible de mettre a jour un contrat qui n'existe pas");
        const contract = await prisma.contract.update({
            where: {
                id: id
            },
            data
        });
        return contract;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const destroy = async (id) => {
    try {
        const exists = await prisma.contract.findUnique({
            where: { id }
        });

        if (!exists) throw new Error("C'est impossible de mettre a jour un contrat qui n'existe pas");
        const contract = await prisma.contract.delete({
            where: {
                id: id
            }
        });
        return contract;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


const validateContract = (contractData) => {
    if (!contractData.userId) throw new Error("Il faut renseigner un utilisateur");
    if (!contractData.startDate) throw new Error("Il faut renseigner une date de debut");
    if (!contractData.endDate) throw new Error("Il faut renseigner une date de fin");
    let startDate, endDate;
    try {
        startDate = new Date(contractData.startDate);
        endDate = new Date(contractData.endDate);

        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            throw new Error("Format de date invalide");
        }
    } catch (error) {
        throw new Error("La date est incorrecte: " + error.message);
    }

    if (startDate > endDate) {
        throw new Error("La date de fin doit être supérieure a la date de début");
    }
}

export default {
    getByContractId,
    getAllContractsBySessionId,
    getAll,
    create,
    update,
    destroy,
    getContractByUserId
}