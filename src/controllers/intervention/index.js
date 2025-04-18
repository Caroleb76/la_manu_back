import { Router } from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";
import getByContractId from "./getByContractId.js";
import create from "./create.js";
import update from "./update.js";
import destroy from "./destroy.js";

const router = Router();

router.get("/:id", authMiddleware, getByContractId);
router.post("/", authMiddleware, create);
router.put("/:id", authMiddleware, update);
router.delete("/:id", authMiddleware, destroy);

export default router;
