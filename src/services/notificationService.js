import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getNotifications = async (offset = 0, limit = 10, searchText = null) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // optionnel: comparer à la date du jour sans l'heure

    const notifications = await prisma.notification.findMany({
      skip: offset,
      take: limit,
      orderBy: [{ priority: "asc" }, { endDate: "desc" }],
      where: {
        endDate: { gte: today }, // toujours appliqué
        ...(searchText
          ? {
              OR: [
                { title: { contains: searchText, mode: "insensitive" } },
                { content: { contains: searchText, mode: "insensitive" } },
              ],
            }
          : {}),
      },
    });

    const total = await prisma.notification.count();
    return { notifications, total };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getNotificationById = async (id) => {
  try {
    const notification = await prisma.notification.findUnique({
      where: {
        id: id,
      },
    });
    if (!notification) {
      throw new Error("aucune notification trouvée");
    }
    return notification;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateNotification = async (id, data) => {
  try {
    const updated = await prisma.notification.update({
      where: { id },
      data,
    });
    return updated;
  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error);
    throw error;
  }
};

const createNotification = async (data) => {
  try {
    data.startDate = new Date(data.startDate);
    data.endDate = new Date(data.endDate);
    const notification = await prisma.notification.create({
      data,
    });

    return notification;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteNotificationById = async (id) => {
  try {
    const notification = await prisma.notification.delete({
      where: {
        id: id,
      },
    });
    return notification;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default {
  getNotifications,
  getNotificationById,
  updateNotification,
  createNotification,
  deleteNotificationById,
};
