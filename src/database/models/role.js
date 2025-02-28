import { DataTypes } from "sequelize";

export default (sequelize) => {
  const role = sequelize.define(
    "role",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: false, //created at updated at
    }
  );
  return role;
};
