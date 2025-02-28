import Sequelize from "sequelize";

let sequelizeInstance = null;
export default async () => {
  if (sequelizeInstance) return sequelizeInstance;
  sequelizeInstance = new Sequelize({
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });

  try {
    await sequelizeInstance.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  return sequelizeInstance;
};
