import { DataTypes } from "sequelize";

export default (sequelize) => {
  const intervention = sequelize.define(
    "intervention",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      dateIntervention: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      hours: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },

      shift: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      validatedByFormateur: {
        type: DataTypes.BOOLEAN,
      },
      validatedByAdmin: {
        type: DataTypes.BOOLEAN,
      },
    },

    {
      timestamps: true, //created at updated at
    }
  );
  //   users.associate = (database) => {
  //     users.belongsTo(database.role, {});
  //   };
  return intervention;
};
