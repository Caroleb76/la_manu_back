import { Router } from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";
import getByContractId from "./getByContractId.js";
import create from "./create.js";
import update from "./update.js";
import destroy from "./destroy.js";
import getAll from "./getAll.js";
import getBySessionId from "./getBySessionId.js";

const router = Router();

/**
 * @swagger
 * /contracts:
 *   get:
 *     summary: Get all contracts with optional filtering and pagination
 *     tags: [Contracts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: filter
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *         description: JSON string for filtering (e.g. {"userId":"abc-123"})
 *       - name: offset
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Number of items to skip
 *       - name: limit
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Maximum number of items to return
 *     responses:
 *       200:
 *         description: List of contracts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/docs/schemas/Contract'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/", authMiddleware, getAll);
/**
 * @swagger
 * /contracts/{id}:
 *   get:
 *     summary: Get a contract by its ID
 *     tags: [Contracts]
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
 *         description: Contract found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/docs/schemas/Contract'
 *       404:
 *         description: Contract not found
 *       401:
 *         description: Unauthorized
 */
router.get("/:id", authMiddleware, getByContractId);

/**
 * @swagger
 * /contracts/session/{id}:
 *   get:
 *     summary: Get all contracts by sessionFormation ID
 *     tags: [Contracts]
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
 *         description: List of contracts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/docs/schemas/Contract'
 *       401:
 *         description: Unauthorized
 */
router.get("/session/:id", authMiddleware, getBySessionId);

/**
 * @swagger
 * /contracts/session/{id}:
 *   get:
 *     summary: Get all contracts by sessionFormation ID
 *     tags: [Contracts]
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
 *         description: List of contracts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/docs/schemas/Contract'
 *       401:
 *         description: Unauthorized
 */
router.get("/session/:id", authMiddleware, getBySessionId);

/**
 * @swagger
 * /contracts:
 *   post:
 *     summary: Create a new contract
 *     tags: [Contracts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/docs/schemas/Contract'
 *     responses:
 *       201:
 *         description: Contract created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/docs/schemas/Contract'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post("/", authMiddleware, create);

/**
 * @swagger
 * /contracts/{id}:
 *   put:
 *     summary: Update a contract by ID
 *     tags: [Contracts]
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
 *             $ref: '#/docs/schemas/Contract'
 *     responses:
 *       200:
 *         description: Contract updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/docs/schemas/Contract'
 *       404:
 *         description: Contract not found
 *       401:
 *         description: Unauthorized
 */
router.put("/:id", authMiddleware, update);

/**
 * @swagger
 * /contracts/{id}:
 *   delete:
 *     summary: Delete a contract by ID
 *     tags: [Contracts]
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
 *         description: Contract deleted
 *       404:
 *         description: Contract not found
 *       401:
 *         description: Unauthorized
 */
router.delete("/:id", authMiddleware, destroy);

export default router;
