import { Router } from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";
import getByFormationId  from "./getByFormationId.js";
import create from "./create.js";
import update from "./update.js";
import destroy from "./destroy.js";
import getById from "./getById.js";
const router= Router();

router.get("/:id",authMiddleware,getByFormationId);
router.get("/:id",authMiddleware,getById);
router.post("/",authMiddleware,create);
router.get("/:id",authMiddleware,update);
router.get("/:id",authMiddleware,destroy);


export default router;