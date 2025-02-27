import { Router } from "express";
import getAll from "./getAll.js";
import deleteUser from "./delete.js";
import create from "./create.js";

const router = Router();
router.get("/getAll", getAll);
router.delete("/:id", deleteUser);
router.post("/", create);
export default router;
