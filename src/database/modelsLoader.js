import { fileURLToPath } from "url";
import path from "path";
import connection from "./connection.js";
import fs from "fs";
import { createRequire } from "module";

export default async (withSync = false) => {
  //recuperation de la connexion de l'appli créée dans connection.js
  const sequelize = await connection();
  const database = {};
  //import d'un outil pour interagir avec les chemins de l'appli
  const filePath = fileURLToPath(import.meta.url);
  //recuperation chemin vers dossier database
  const directoryPath = path.dirname(filePath);
  // recuperation chemin vers dosseir models
  const modelsPath = path.join(directoryPath, "models");

  //pour chacun des fichiers dans le dossier models
  fs.readdirSync(modelsPath).forEach((file) => {
    console.log(file);
    // si le fichier est un fichier js
    if (file.endsWith(".js")) {
      //on rajoute de nom du fichier pour créer des chemins
      const modelFunction = createRequire(import.meta.url)(
        path.join(modelsPath, file)
      ).default;
      console.log(modelFunction);
      // si il trouve une fonction dans le fichier models alors il exécute la fonction
      if (typeof modelFunction == "function") {
        const model = modelFunction(sequelize);
        database[model.name] = model;
      }
    }
  });

  // si withsync est activé on va synchroniser la mise a jour de la bdd
  if (withSync) {
    await sequelize.sync({ alter: true });
  }
};
