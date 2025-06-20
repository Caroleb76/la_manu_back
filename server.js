import express, { Router } from "express";
import routes from "./src/routes.js";
import dotenv from "dotenv";
import swaggerSpec from "./src/docs/swagger.js";
import swaggerUi from "swagger-ui-express";
import cors from "cors";

dotenv.config({ path: ".env" });
// initialisation de l'appli express
const app = express();
const port = process.env.PORT ?? 3000; // definition du port
const router = Router(); // initialisation du router

// formater les réponses de l'api en json
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//Test route
app.get("/", (req, res) => {
    res.send("The api is running");
})

// on passe le router dans les routes
routes(router);
//ajouter le prefixe /api/v1 à toutes les routes
app.use("/api/v1", router);
//swagger endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
// associer le port à notre application
app.listen(port, () => {
    console.log(`listening on port http://localhost:${port}`);
});
