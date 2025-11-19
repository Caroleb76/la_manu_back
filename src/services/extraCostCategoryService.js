import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAll = async () => {
  try {
    const extraCosts = await prisma.extraCostCategory.findMany();

    return extraCosts;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default { getAll };
