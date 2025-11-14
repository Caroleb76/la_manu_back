import prisma from "../../src/utils/prisma.js";


export const defaultNotifications = [
    {
        title: "Mise à jour urgente des dossiers étudiants",
        content: "Les responsables de formation doivent mettre à jour les dossiers étudiants avant la fin de la semaine.",
        priority: 1, // haute
        startDate: new Date("2025-11-15"),
        endDate: new Date("2025-11-22"),
    },
    {
        title: "Nouvelle session de formation disponible",
        content: "Une nouvelle session “Techniques d’intervention sociale – Module 2” a été ajoutée. Merci de vérifier les inscriptions.",
        priority: 2, // moyenne
        startDate: new Date("2025-11-14"),
        endDate: new Date("2025-11-28"),
    },
    {
        title: "Maintenance planifiée",
        content: "Le système sera indisponible pendant une courte maintenance technique dimanche entre 6h et 7h.",
        priority: 3, // basse
        startDate: new Date("2025-11-17"),
        endDate: new Date("2025-11-17"), // same day, still valid
    },
    {
        title: "Mise à jour du guide utilisateur",
        content: "Le guide utilisateur de la plateforme a été mis à jour. Vous pouvez consulter la nouvelle version depuis votre espace personnel.",
        priority: 3, // basse
        startDate: new Date("2025-11-13"),
        endDate: new Date("2025-11-30"),
    },
];


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
