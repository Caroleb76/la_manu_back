import { Router } from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";
import getAll from "./getAll.js";
import create from "./create.js";
import destroy from "./destroy.js";

const router =  Router();

router.get("/",authMiddleware,getAll);
router.post("/",authMiddleware,create);
router.delete("/:id",authMiddleware,destroy);

export default router;