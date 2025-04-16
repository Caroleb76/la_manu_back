import pkg from "@prisma/client";
import passwordUtils from "../utils/utils.js";

const { PrismaClient } = pkg;

const prisma = new PrismaClient();

const getUsers = async (data) => {
  try {
    const users = await prisma.user.findMany();

    console.log(users);
    return users;
  } catch (error) {
    console.error(error);
  }
};

const getUserById = async (id) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!user) {
      throw new Error("aucun utilisateur trouvé");
    }
    console.log(user);
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createUser = async (data) => {
  try {
    if (!data.password) {
      throw new Error("mot de passe manquant");
    }
    const hashedPassword = passwordUtils.hashPassword(data.password);
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
      },
    });

    console.log(user);
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteUserById = async (id) => {
  try {
    const user = await prisma.user.delete({
      where: {
        id: id,
      },
    });
    if (!user) {
      throw new Error("aucun utilisateur trouvé");
    }
    console.log(user);
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateUserById = async (id, data) => {
  try {
    if (!data.password) {
      throw new Error("mot de passe manquant");
    }
    const hashedPassword = passwordUtils.hashPassword(data.password);
    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        email: data.email,
        password: hashedPassword,
      },
    });
    if (!user) {
      throw new Error("aucun utilisateur trouvé");
    }
    console.log(user);
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export default {
  getUsers,
  getUserById,
  createUser,
  deleteUserById,
  updateUserById,
};
