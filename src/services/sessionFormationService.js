import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();



const getSessions = async (offset=0,limit=10) => {
  try {
    const sessionFormations = await prisma.sessionFormation.findMany({
      skip: offset,
      take: limit,
      include:{
        Address: true,
        Formation: true
      }
    });
    const total = await prisma.sessionFormation.count();
    console.log(`[+] Got the formations sessiosn length ${sessionFormations.length} total ${total}`);
    return { sessionFormations, total };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const create = async (data) => {
  try {
    validateSessionFormation(data);
    const sessionFormation = await prisma.sessionFormation.create({
      data,
    });
    return sessionFormation;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getByFormationId = async (formationId) => {
  try {
    const sessions = await prisma.sessionFormation.findMany({
      where: {
        formationId: formationId,
      },
      include: {
        Address: true,
      },
    });
    return sessions;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getById = async (id) => {
  try {
    const session = await prisma.sessionFormation.findUnique({
      where: {
        id: id,
      },
      include: {
        Address: true,
      },
    });
    return session;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const update = async (id, data) => {
  try {
    const session = await prisma.sessionFormation.update({
      where: {
        id: id,
      },
      data,
    });
    return session;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const destroy = async (id) => {
  try {
    const session = await prisma.sessionFormation.destroy({
      where: {
        id: id,
      },
    });
    return session;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const validateSessionFormation = (data) => {
  if (!data) throw new Error("il manque des champs");
  if (!data.serialNumber) throw new Error("il manque le serialNumber");
  if (!data.formationId) throw new Error("il manque la formationId");
  if (!data.addressId) throw new Error("il manque l'addressId");
};

export default {
  getSessions,
  create,
  getByFormationId,
  getById,
  update,
  destroy,
};
