import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getFiles = async () => {
    try {
        const files = await prisma.file.findMany();

        console.log(files);
        return files;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getFilesByUserId = async (userId) => {
    try {
        const files = await prisma.file.findMany({
            where: {
                userId: userId,
            },
        });

        console.log(files);
        return files;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getFilesByExtraCostId = async (extraCostId) => {
    try {
        const files = await prisma.file.findMany({
            where: {
                extraCostId: extraCostId,
            },
        });

        console.log(files);
        return files;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getFileById = async (id) => {
    try {
        const file = await prisma.file.findUnique({
            where: {
                id: id,
            },
        });
        console.log(file);
        return file;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const updateFileById = async (id, data) => {
    try {
        const updated = await prisma.file.update({
            where: { id },
            data,
        });
        console.log("Fichier mis à jour :", updated);
        return updated;
    } catch (error) {
        console.error("Erreur lors de la mise à jour :", error);
        throw error;
    }
};

const createFile = async (data) => {
    try {
        const file = await prisma.file.create({
            data,
        });

        console.log(file);
        return file;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const deleteFileById = async (id) => {
    try {
        const file = await prisma.file.delete({
            where: {
                id: id,
            },
        });
        console.log(file);
        return file;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default {
    getFiles,
    getFilesByUserId,
    getFilesByExtraCostId,
    getFileById,
    updateFileById,
    createFile,
    deleteFileById,
};
