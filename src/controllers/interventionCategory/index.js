import { Router } from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";
import getAll from "./getAll.js";
import create from "./create.js";
import destroy from "./destroy.js";

const router = Router();

/**
 * @swagger
 * /interventionCategories:
 *   get:
 *     summary: Get all intervention categories
 *     tags: [InterventionCategories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of intervention categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/InterventionCategory'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get("/", authMiddleware, getAll);

/**
 * @swagger
 * /interventionCategories:
 *   post:
 *     summary: Create a new intervention category
 *     tags: [InterventionCategories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InterventionCategory'
 *     responses:
 *       201:
 *         description: Category created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InterventionCategory'
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
router.post("/", authMiddleware, create);

/**
 * @swagger
 * /interventionCategories/{id}:
 *   delete:
 *     summary: Delete an intervention category by ID
 *     tags: [InterventionCategories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the category to delete
 *     responses:
 *       204:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 *       401:
 *         description: Unauthorized
 */
router.delete("/:id", authMiddleware, destroy);

export default router;
