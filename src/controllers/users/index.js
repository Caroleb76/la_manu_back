import getAll from "./getAll.js";
import deleteUser from "./delete.js";
import create from "./create.js";
import getById from "./getById.js";
import { Router } from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";
//récupération du routeur pour lui associer les différentes routes
const router = Router();
// liste de toutes les routes pour le dossier
//get = récupérer les infos
router.get("/",authMiddleware, getAll);
router.get("/:id",authMiddleware, getById);
// delete = supprimer les infos
router.delete("/:id",authMiddleware, deleteUser); //"api/v1/users/123jksdhfkjhg"
// post = envoyer les infos dans un formulaire
router.post("/",authMiddleware, create);
// put = remplacer tous les champs et patch = modifier un seul champ

export default router;

