import getAll from "./getAll.js";
import destroy from "./destroy.js";
import create from "./create.js";
import update from "./update.js";
import getById from "./getById.js";
import { Router } from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = Router();

// Get all users
router.get("/", authMiddleware, getAll);

//Get 1 user from their ID
router.get("/:id", authMiddleware, getById);

//Create 1 user
router.post("/", authMiddleware, create);

//Update 1 user
router.put("/:id", authMiddleware, update);

//Delete 1 user
router.delete("/:id", authMiddleware, destroy);

export default router;
