import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import { PROFILE_PICTURE_KEY } from "../utils/constants.js";

const prisma = new PrismaClient();

const getFiles = async () => {
  try {
    const files = await prisma.file.findMany();

    return files;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getFilesByUserId = async (userId) => {
  try {
    let files = await prisma.file.findMany({
      where: {
        userId: userId,
      },
    });
    files= files.filter(it => it.name!= PROFILE_PICTURE_KEY);
    return files;
  } catch (error) {
    console.error(error);
    throw error;
  }
};



const getFilesByExtraCostId = async (extraCostId) => {
  try {
    const files = await prisma.file.findMany({
      where: {
        extraCostId: extraCostId,
      },
    });

    return files;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getFileById = async (id) => {
  try {
    const file = await prisma.file.findUnique({
      where: {
        id: id,
      },
    });
    return file;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateFileById = async (id, data) => {
  try {
    const updated = await prisma.file.update({
      where: { id },
      data,
    });
    return updated;
  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error);
    throw error;
  }
};

const createFile = async (data) => {
  try {
    
    const existingFile = await prisma.file.findFirst({
      where: {
        name: data.name,
        userId: data.userId,
        extraCostId: data.extraCostId
      }
    });

    if (existingFile) {
      const deleteFromDisk = existingFile.name != PROFILE_PICTURE_KEY;
      await deleteFileById(existingFile.id,deleteFromDisk);
    }
    const file = await prisma.file.create({
      data:{
        userId: data.userId,
        name: data.name,
        url: data.path,
        extraCostId: data.extraCostId
      },
    });

    return file;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createFilesInBulk = async (files) => {
  for ( const file of files) {
    await createFile(file);
  }
};



const deleteFileById = async (id,deleteFromDisk=false) => {
  try {

    const file = await prisma.file.findUnique({
      where: { id },
    });

    if (!file) {
      throw new Error("File not found in database");
    }


    await prisma.file.delete({ where: { id } });
// I made this optional because when updating the profile picture we do not need to delete the file manually
// since the middlleware does this
    if(deleteFromDisk){

      const filePath = path.resolve(file.url); 
  
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath); 
      } else {
        console.warn("File not found on disk:", filePath);
      }
    }

    return file;
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
};

export default {
  getFiles,
  getFilesByUserId,
  getFilesByExtraCostId,
  getFileById,
  updateFileById,
  createFile,
  deleteFileById,
  createFilesInBulk
};
