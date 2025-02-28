import { DataTypes } from "sequelize";

export default (sequelize) => {
    const sessionFormation = sequelize.define(
        "sessionFormation",
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            serialNumber: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            startDate: {
                type: DataTypes.DATEONLY,
                allowNull: true,
            },
            endDate: {
                type: DataTypes.DATEONLY,
                allowNull: true,
            },
        },
        {
            timestamps: true, //created at updated at
        }
    );
    return sessionFormation;
};
