import { DataTypes } from "sequelize";

export default (sequelize) => {
    const interventionCategory = sequelize.define(
        "interventionCategory",
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
            rate: {
                type: DataTypes.DECIMAL,
                allowNull: false,
            },
        },
        {
            timestamps: false, 
        }
    );
    return interventionCategory;
};