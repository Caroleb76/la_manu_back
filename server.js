// const express = require("express");  ancienne syntaxe
// importation des librairies et des fichiers utiles
import express, { Router } from "express";
import routes from "./src/routes.js";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
// initialisation de l'appli express
const app = express();
const port = process.env.PORT ?? 3000; // definition du port
const router = Router(); // initialisation du router

// formater les réponses de l'api en json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// on passe le router dans les routes
routes(router);
//ajouter le prefixe /api/v1 à toutes les routes
app.use("/api/v1", router);
// associer le port à notre application
app.listen(port, () => {
    console.log("listening on port " + port);
});
