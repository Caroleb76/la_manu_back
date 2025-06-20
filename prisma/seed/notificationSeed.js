import prisma from "../../src/utils/prisma.js";


export const defaultNotifications = [
    {
        title: "Notification 1",
        content: "Description de la notification 1",
        priority: 1,
        startDate: new Date("2023-01-01"),
        endDate: new Date("2023-01-31"),
    },
    {
        title: "Notification 2",
        content: "Description de la notification 2",
        priority: 2,
        startDate: new Date("2024-02-01"),
        endDate: new Date("2024-02-25"),
    },
    {
        title: "Notification 3",
        content: "Description de la notification 3",
        priority: 3,
        startDate: new Date("2025-02-01"),
        endDate: new Date("2025-02-25"),
    },
]

export async function createNotificationSeed(notification) {
    const createdNotification = await prisma.notification.create({
        data: {
            title: notification.title,
            content: notification.content,
            priority: notification.priority,
            startDate: notification.startDate,
            endDate: notification.endDate
        }
    });
    return createdNotification;
}
