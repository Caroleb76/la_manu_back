import { DataTypes } from "sequelize";

export default (sequelize) => {
  const file = sequelize.define(
    "file",
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
      url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: false, //created at updated at
    }
  );
  file.associate = (database) => {
    file.belongsTo(database.extraCost, { allowNull: true });
    file.belongsTo(database.user, {});
  };
  return file;
};
