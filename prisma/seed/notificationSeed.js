async function createNotifications() {
    await prisma.notification.createMany({
        data: [
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
                startDate: new Date("2023-02-01"),
                endDate: new Date("2023-02-25"),
            },
        ],
    });
}

export default createNotifications