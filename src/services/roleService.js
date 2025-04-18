import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getRoles = async () => {
  try {
    const roles = await prisma.role.findMany();

    console.log(roles);
    return roles;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getRoleById = async (id) => {
  try {
    const role = await prisma.role.findUnique({
      where: {
        id: id,
      },
    });
    console.log(role);
    return role;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getRoleByName = async (roleName) => {
  try {
    const role = await prisma.role.findUnique({
      where: {
        name: roleName,
      },
    });
    console.log(role);
    return role;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateRole = async (id, data) => {
  try {
    const updated = await prisma.role.update({
      where: { id },
      data,
    });
    console.log("Role mise à jour :", updated);
    return updated;
  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error);
    throw error;
  }
};

const createRole = async (data) => {
  try {
    const role = await prisma.role.create({
      data,
    });

    console.log(role);
    return role;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteRoleById = async (id) => {
  try {
    const role = await prisma.role.destroy({
      where: {
        id: id,
      },
    });
    console.log(role);
    return role;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default {
  getRoles,
  getRoleById,
  updateRole,
  createRole,
  deleteRoleById,
  getRoleByName,
};
