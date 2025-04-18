import getAll from "./getAll.js";
import destroy from "./destroy.js";
import create from "./create.js";
import update from "./update.js";
import getById from "./getById.js";
import { Router } from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = Router();

router.get("/", authMiddleware, getAll);

router.get("/:id", authMiddleware, getById);

router.post("/", authMiddleware, create);

router.put("/:id", authMiddleware, update);

router.delete("/:id", authMiddleware, destroy);

export default router;
