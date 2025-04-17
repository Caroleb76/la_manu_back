import { PrismaClient } from '@prisma/client';
import passwordUtils from "../utils/utils.js";
import RoleService from "./roleService.js";
import { ROLES } from '../utils/constants.js';

const prisma = new PrismaClient();



const getUsers = async () => {
  try {
    const users = await prisma.user.findMany();

    console.log(users);
    return users;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      include:{
        role: true
      }
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
    // add the role FORMATEUR to created users by default
    let formateurRole= await RoleService.getRoleByName(ROLES.FORMATEUR);
    // if the role FORMATEUR doesn't exist create it
    if(!formateurRole) formateurRole = await RoleService.createRole({name: ROLES.FORMATEUR});
    data.roldId= formateurRole.id;
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
