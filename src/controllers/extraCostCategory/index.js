import getAll from "./getAll.js";
import { Router } from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";


const router = Router();

router.get("/", authMiddleware, getAll);


export default router;
