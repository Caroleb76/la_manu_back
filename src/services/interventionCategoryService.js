import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const create = async (data) => {
    try {
        if(!data.name  || !data.rate){
            throw new Error("il manque des champs");
        }
        const interventionCategory = await prisma.interventionCategory.create({
            data
        });

        console.log(`[+] A new interventionCategory has been created: ${interventionCategory}`);

        return interventionCategory;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const destroy = async (id) => {
    try {
        const interventionCategory = await prisma.interventionCategory.delete({
            where: {
                id: id
            }
        });
        console.log(`[+] A interventionCategory has been deleted: ${interventionCategory}`);
        return interventionCategory;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getAll = async () => {
    try {
        const interventionCategories = await prisma.interventionCategory.findMany();

        console.log(interventionCategories);
        return interventionCategories;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default {
    create,
    destroy,
    getAll
}