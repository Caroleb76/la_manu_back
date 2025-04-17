import { prismaClient } from "@prisma/client";

const prisma = new prismaClient();

const getAddresses = async () => {
  try {
    const addresses = await prisma.address.findMany();

    console.log(addresses);
    return addresses;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getAddressById = async (id) => {
  try {
    const address = await prisma.address.findUnique({
      where: {
        id: id,
      },
    });
    console.log(address);
    return address;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateAddress = async (id, data) => {
  try {
    const updated = await prisma.address.update({
      where: { id },
      data,
    });
    console.log("Adresse mise à jour :", updated);
    return updated;
  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error);
    throw error;
  }
};

const createAddress = async (data) => {
  try {
    const address = await prisma.address.create({
      data,
    });

    console.log(address);
    return address;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteAddressById = async (id) => {
  try {
    const address = await prisma.address.delete({
      where: {
        id: id,
      },
    });
    console.log(address);
    return address;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default {
  getAddresses,
  getAddressById,
  updateAddress,
  createAddress,
  deleteAddressById,
};
