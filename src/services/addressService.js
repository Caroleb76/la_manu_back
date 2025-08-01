import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAddresses = async (limit = 10, offset = 0, searchText = null) => {
  try {
    const addresses = await prisma.address.findMany(
      {
        skip: offset,
        take: limit,
        where: searchText ? {
          OR: [
            {
              city: {
                contains: searchText,
                mode: "insensitive",
              },
            },
            {
              address: {
                contains: searchText,
                mode: "insensitive",
              },
            },
          ],
        } : {},
      }
    );

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

    return address;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateAddressById = async (id, data) => {
  try {
    const updated = await prisma.address.update({
      where: { id },
      data,
    });
   
    return updated;
  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error);
    throw error;
  }
};

const createAddress = async (data) => {
  try {
 ;

    const address = await prisma.address.create({
      data,
    });


    return address;
  } catch (error) {
    if (error.code === "P2002") {
      if (error.message.includes("address")) {
        throw new Error("l'adresse existe deja dans la base de données");
      }
    }
    console.error(error);
    throw error;
  }
};

const deleteAddressById = async (id) => {
  try {
    const address = await prisma.address.destroy({
      where: {
        id: id,
      },
    });
   
    return address;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default {
  getAddresses,
  getAddressById,
  updateAddressById,
  createAddress,
  deleteAddressById,
};
