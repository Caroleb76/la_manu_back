import getAll from "./getAll.js";
import destroy from "./destroy.js";
import create from "./create.js";
import update from "./update.js";
import getById from "./getById.js";
import { Router } from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = Router();

/**
 * @swagger
 * /extra-costs:
 *   get:
 *     summary: Get all extra costs
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of extra costs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ExtraCost'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get("/", authMiddleware, getAll);

/**
 * @swagger
 * /extra-costs/{id}:
 *   get:
 *     summary: Get an extra cost by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Extra cost found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExtraCost'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.get("/:id", authMiddleware, getById);

/**
 * @swagger
 * /extra-costs:
 *   post:
 *     summary: Create a new extra cost
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ExtraCost'
 *     responses:
 *       201:
 *         description: Extra cost created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExtraCost'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post("/", authMiddleware, create);

/**
 * @swagger
 * /extra-costs/{id}:
 *   delete:
 *     summary: Delete an extra cost
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       204:
 *         description: Extra cost deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.delete("/:id", authMiddleware, destroy);

/**
 * @swagger
 * /extra-costs/{id}:
 *   put:
 *     summary: Update an existing extra cost
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ExtraCost'
 *     responses:
 *       200:
 *         description: Extra cost updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExtraCost'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.put("/:id", authMiddleware, update);

export default router;
