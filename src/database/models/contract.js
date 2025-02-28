import { DataTypes } from "sequelize";

export default (sequelize) => {
  const contract = sequelize.define(
    "contract",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
  contract.associate = (database) => {
    contract.belongsTo(database.sessionFormation, {});
  };
  return contract;
};
