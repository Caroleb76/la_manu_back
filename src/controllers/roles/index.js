import getAll from "./getAll.js";
import deleteUser from "./delete.js";
import create from "./create.js";
import getById from "./getById.js";
import { Router } from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = Router();

router.get("/",authMiddleware, getAll);

router.get("/:id",authMiddleware, getById);

router.post("/",authMiddleware, create);

router.delete("/:id",authMiddleware, deleteUser); 


export default router;

