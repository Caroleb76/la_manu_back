import { DataTypes } from "sequelize";

export default (sequelize) => {
  const extraCost = sequelize.define(
    "extraCost",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      category: {
        type: DataTypes.ENUM("frais_de_repas"),
        allowNull: false,
      },
      val: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: false, //created at updated at
    }
  );
  return extraCost;
};
