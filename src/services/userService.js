import { PrismaClient } from "@prisma/client";
import passwordUtils from "../utils/utils.js";
import RoleService from "./roleService.js";
import { ROLES } from "../utils/constants.js";

const prisma = new PrismaClient();

const getUsers = async (offset = 0, limit = 10) => {
  try {
    const users = await prisma.user.findMany({
      skip: offset,
      take: limit,
      include: {
        role: true,
      },
    })
    const total = await  prisma.user.count()

    return {users, total};
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: id,
      },
      include: {
        role: true,
        address: true,
      },
    });
    if (!user) {
      throw new Error("aucun utilisateur trouvé");
    }
    // console.log("BY ID");
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const getUserByEmail = async (email) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
      include: {
        role: true,
        address: true,
      },
    });
    if (!user) {
      throw new Error("aucun utilisateur trouvé");
    }
    // console.log(user);
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createUser = async (data) => {
  try {
    // add the role FORMATEUR to created users by default
    if (!data.role) {
      let formateurRole = await RoleService.getRoleByName(ROLES.FORMATEUR);
      // if the role FORMATEUR doesn't exist create it
      if (!formateurRole)
        formateurRole = await RoleService.createRole({ name: ROLES.FORMATEUR });
      data.role = formateurRole.id;
    }
    if (!data.password) {
      throw new Error("mot de passe manquant");
    }
    const hashedPassword = await passwordUtils.hashPassword(data.password);
    console.log("We have got ", hashedPassword);

    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        firstName: data.firstName,
        lastName: data.lastName,
        roleId: data.role
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
    const deleted = await prisma.user.destroy({
      where: {
        id: id,
      },
    });
    if (!deleted) {
      throw new Error("aucun utilisateur trouvé");
    }
    console.log(deleted);
    return deleted;
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

const blockUserById = async (id, data) => {
  try {
    
    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        blocked : data.blocked
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
  getUserByEmail,
  createUser,
  deleteUserById,
  updateUserById,
  blockUserById,
};
