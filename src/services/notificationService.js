import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getNotifications = async () => {
  try {
    const notifications = await prisma.notifications.findMany();

    console.log(notifications);
    return notifications;
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
    console.log(notification);
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
    console.log("Notification mise à jour :", updated);
    return updated;
  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error);
    throw error;
  }
};

const createNotification = async (data) => {
  try {
    const notification = await prisma.notification.create({
      data,
    });

    console.log(notification);
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
    console.log(notification);
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
