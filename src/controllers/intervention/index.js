import { Router } from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";
import getByContractId from "./getByContractId.js";
import create from "./create.js";
import update from "./update.js";
import destroy from "./destroy.js";
import createMany from "./createMany.js";
import getAll from "./getAll.js";
import getByUserId from "./getByUserId.js";
import validate from "./validate.js";
import getTotalHoursPerCategory from "./getTotalHoursPerCategory.js";
import getTotalAmountPerMonth from "./getTotalAmountPerMonth.js";
import validatePayment from "./validatePayment.js";

const router = Router();


/**
 * @swagger
 * /interventions/contract/{id}:
 *   get:
 *     summary: Get interventions by contract ID
 *     tags: [Interventions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of interventions for the specified contract
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Intervention'
 *       404:
 *         description: No interventions found
 *       401:
 *         description: Unauthorized
 */
router.get("/", authMiddleware, getAll);


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
 *                 $ref: '#/components/schemas/Intervention'
 *       404:
 *         description: No interventions found
 *       401:
 *         description: Unauthorized
 */
router.get("/contract/:id", authMiddleware, getByContractId);

/**
 * @swagger
 * /interventions/user/{id}:
 *   get:
 *     summary: Get interventions by user ID
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
 *                 $ref: '#/components/schemas/Intervention'
 *       404:
 *         description: No interventions found
 *       401:
 *         description: Unauthorized
 */
router.get("/user/:id", authMiddleware, getByUserId);


/**
 * @swagger
 * /interventions/user/{id}:
 *   get:
 *     summary: Get interventions by user ID
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
 *                 $ref: '#/components/schemas/Intervention'
 *       404:
 *         description: No interventions found
 *       401:
 *         description: Unauthorized
 */
router.get("/categories/hours", authMiddleware, getTotalHoursPerCategory);

/**
 * @swagger
 * /interventions/user/{id}:
 *   get:
 *     summary: Get interventions by user ID
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
 *                 $ref: '#/components/schemas/Intervention'
 *       404:
 *         description: No interventions found
 *       401:
 *         description: Unauthorized
 */
router.get("/monthlyAmount/:date", authMiddleware, getTotalAmountPerMonth);

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
 *             $ref: '#/components/schemas/Intervention'
 *     responses:
 *       201:
 *         description: Intervention created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Intervention'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post("/", authMiddleware, create);

/**
 * @swagger
 * /interventions/validate/{id}:
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
 *             $ref: '#/components/schemas/Intervention'
 *     responses:
 *       201:
 *         description: Intervention created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Intervention'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post("/validate/:id", authMiddleware, validate);


/**
 * @swagger
 * /interventions/validate/{id}:
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
 *             $ref: '#/components/schemas/Intervention'
 *     responses:
 *       201:
 *         description: Intervention created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Intervention'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.put("/validatePayment/:id", authMiddleware, validatePayment);




/**
 * @swagger
 * /interventions:
 *   post:
 *     summary: Create several  new interventions
 *     tags: [Interventions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Intervention'
 *     responses:
 *       201:
 *         description: Interventions created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Intervention'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post("/many", authMiddleware, createMany);

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
 *             $ref: '#/components/schemas/Intervention'
 *     responses:
 *       200:
 *         description: Intervention updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Intervention'
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
