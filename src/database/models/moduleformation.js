import { DataTypes } from "sequelize";

export default (sequelize) => {
    const moduleFormation = sequelize.define(
        "moduleFormation",
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
        },
        {
            timestamps: true, //created at updated at
        }
    );
    return moduleFormation;
};
