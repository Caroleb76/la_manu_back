import getAll from "./getAll.js";
import deleteUser from "./delete.js";
import create from "./create.js";
import update from "./update.js";
import getById from "./getById.js";
import { Router } from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";

//récupération du routeur pour lui associer les différentes routes
const router = Router();
// liste de toutes les routes pour le dossier


router.get("/",authMiddleware, getAll);

router.get("/:id",authMiddleware, getById);

router.post("/",authMiddleware, create);

router.delete("/:id",authMiddleware, deleteUser); 

router.put("/:id",authMiddleware, update);

export default router;

