import { Router } from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";
import getByFormationId from "./getByFormationId.js";
import create from "./create.js";
import update from "./update.js";
import destroy from "./destroy.js";
import getById from "./getById.js";
const router = Router();

/**
 * @swagger
 * /SessionFormation/formation/{id}:
 *   get:
 *     summary: Get module formations by formation ID
 *     tags: [SessionFormations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the formation
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: List of module formations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/docs/schemas/SessionFormation'
 *       401:
 *         description: Unauthorized
 */
router.get("/formation/:id", authMiddleware, getByFormationId);

/**
 * @swagger
 * /SessionFormation/{id}:
 *   get:
 *     summary: Get a module formation by ID
 *     tags: [SessionFormations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Module formation found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/docs/schemas/SessionFormation'
 *       404:
 *         description: Module formation not found
 *       401:
 *         description: Unauthorized
 */
router.get("/:id", authMiddleware, getById);

/**
 * @swagger
 * /SessionFormation:
 *   post:
 *     summary: Create a new module formation
 *     tags: [SessionFormations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/docs/schemas/SessionFormation'
 *     responses:
 *       201:
 *         description: Module formation created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/docs/schemas/SessionFormation'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post("/", authMiddleware, create);

/**
 * @swagger
 * /SessionFormation/{id}:
 *   put:
 *     summary: Update a module formation
 *     tags: [SessionFormations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/docs/schemas/SessionFormation'
 *     responses:
 *       200:
 *         description: Module formation updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/docs/schemas/SessionFormation'
 *       404:
 *         description: Not found
 *       401:
 *         description: Unauthorized
 */
router.put("/:id", authMiddleware, update);

/**
 * @swagger
 * /SessionFormation/{id}:
 *   delete:
 *     summary: Delete a module formation
 *     tags: [SessionFormations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       204:
 *         description: Module formation deleted
 *       404:
 *         description: Not found
 *       401:
 *         description: Unauthorized
 */
router.delete("/:id", authMiddleware, destroy);

export default router;
