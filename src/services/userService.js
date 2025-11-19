import { PrismaClient } from "@prisma/client";
import passwordUtils from "../utils/utils.js";
import RoleService from "./roleService.js";
import { PROFILE_PICTURE_KEY, ROLES } from "../utils/constants.js";
import fileService from "./fileService.js";

const prisma = new PrismaClient();

const getUsers = async (
  offset = 0,
  limit = 10,
  searchText = null,
  role = null,
) => {
  try {
    if (role != null) {
      if (
        role !== ROLES.FORMATEUR &&
        role !== ROLES.ADMIN &&
        role !== ROLES.SUPER_ADMIN
      ) {
        throw new Error("Rôle invalide");
      }
    }

    // Start with an empty array of filters
    const filters = [];

    if (searchText && searchText !== "null") {
      filters.push({
        OR: [
          { email: { contains: searchText, mode: "insensitive" } },
          { firstName: { contains: searchText, mode: "insensitive" } },
          { lastName: { contains: searchText, mode: "insensitive" } },
        ],
      });
    }

    if (role) {
      filters.push({
        role: {
          is: {
            name: role,
          },
        },
      });
    }

    // Combine filters with AND if any exist
    const where = filters.length > 0 ? { AND: filters } : {};

    const users = await prisma.user.findMany({
      // skip: offset,
      // take: limit,
      include: {
        role: true,
      },
      where,
    });

    const total = await prisma.user.count({ where });
    return { users, total };
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

    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        firstName: data.firstName,
        lastName: data.lastName,
        roleId: data.role,
      },
    });

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
    return deleted;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteByEmail = async (email) => {
  try {
    const deleted = await prisma.user.delete({
      where: {
        email: email,
      },
    });
    if (!deleted) {
      throw new Error("aucun utilisateur trouvé");
    }
    return deleted;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateUserById = async (id, data) => {
  console.log(data);
  try {
    if (data.files && data.files.length > 0) {
      for (const file of data.files) {
        const savedFile = await fileService.createFile({
          userId: id,
          name: file.fieldname,
          path: file.path,
        });

        if (file.fieldname === PROFILE_PICTURE_KEY) {
          data.profilePicture = savedFile.url.replaceAll("\\", "/");
        }
      }
    }

    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        birthDate: data.birthDate ? new Date(data.birthDate) : null,
        birthName: data.birthName,
        birthPlace: data.birthPlace,
        permisB: data.permisB,
        mutuelle: data.mutuelle,
        employer: data.employer,
        occupation: data.occupation,
        phone: data.phone,
        socialSecurity: data.socialSecurity,
        gender: data.gender,
        diploma: data.diploma,
        profilePicture: data.profilePicture,
        address: {
          update: {
            address: data.address,
            postalCode: data.postalCode,
            city: data.city,
          },
        },
      },
    });
    if (!user) {
      throw new Error("aucun utilisateur trouvé");
    }
    const { password, roleId, ...rest } = user;
    rest.address = {
      address: data.address,
      postalCode: data.postalCode,
      city: data.city,
    };
    return rest;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// change password
const updatePassword = async (id, password) => {
  try {
    const hashedPassword = await passwordUtils.hashPassword(password);
    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        password: hashedPassword,
      },
    });
    if (!user) {
      throw new Error("aucun utilisateur trouvé");
    }
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
        blocked: data.blocked,
      },
    });
    if (!user) {
      throw new Error("aucun utilisateur trouvé");
    }
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
  deleteByEmail,
  updateUserById,
  blockUserById,
  updatePassword,
};
