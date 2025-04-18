import { Router } from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";
import getByContractId from "./getByContractId.js";
import create from "./create.js";
import update from "./update.js";
import destroy from "./destroy.js";

const router = Router();

/**
 * @swagger
 * /interventions/contract/{id}:
 *   get:
 *     summary: Get interventions by contract ID
 *     tags: [Interventions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the contract
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: List of interventions for the specified contract
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/docs/schemas/Intervention'
 *       404:
 *         description: No interventions found
 *       401:
 *         description: Unauthorized
 */
router.get("contract/:id", authMiddleware, getByContractId);

/**
 * @swagger
 * /interventions:
 *   post:
 *     summary: Create a new intervention
 *     tags: [Interventions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/docs/schemas/Intervention'
 *     responses:
 *       201:
 *         description: Intervention created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/docs/schemas/Intervention'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post("/", authMiddleware, create);

/**
 * @swagger
 * /interventions/{id}:
 *   put:
 *     summary: Update an intervention by ID
 *     tags: [Interventions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the intervention
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/docs/schemas/Intervention'
 *     responses:
 *       200:
 *         description: Intervention updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/docs/schemas/Intervention'
 *       404:
 *         description: Intervention not found
 *       401:
 *         description: Unauthorized
 */
router.put("/:id", authMiddleware, update);

/**
 * @swagger
 * /interventions/{id}:
 *   delete:
 *     summary: Delete an intervention by ID
 *     tags: [Interventions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the intervention
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       204:
 *         description: Intervention deleted successfully
 *       404:
 *         description: Intervention not found
 *       401:
 *         description: Unauthorized
 */
router.delete("/:id", authMiddleware, destroy);

export default router;
