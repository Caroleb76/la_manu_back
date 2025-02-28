import { DataTypes } from "sequelize";

export default (sequelize) => {
  const users = sequelize.define(
    "users",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // oubli dans la bdd sur looping
      birthDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      birthName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      birthPlace: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      permisB: {
        type: DataTypes.BOOLEAN,
      },
      mutuelle: {
        type: DataTypes.BOOLEAN,
      },
      employer: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      occupation: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      FirstName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      gender: {
        type: DataTypes.BOOLEAN,
      },
      diploma: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },

    {
      timestamps: true, //created at updated at
    }
  );
  users.associate = (database) => {
    users.belongsTo(database.role, {});
  };
  return users;
};
