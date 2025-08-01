import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const create = async (data) => {
  try {
    if (!data.name || !data.rate) {
      throw new Error("il manque des champs");
    }
    const interventionCategory = await prisma.interventionCategory.create({
      data,
    });

    
    return interventionCategory;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const destroy = async (id) => {
  try {
    const interventionCategory = await prisma.interventionCategory.destroy({
      where: {
        id: id,
      },
    });
 
    return interventionCategory;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getAll = async () => {
  try {
    const interventionCategories = await prisma.interventionCategory.findMany();

    return interventionCategories;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default {
  create,
  destroy,
  getAll,
};
