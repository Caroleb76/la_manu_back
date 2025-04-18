import getAll from "./getAll.js";
import deleteUser from "./delete.js";
import create from "./create.js";
import update from "./update.js";
import getById from "./getById.js";
import { Router } from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";

//récupération du routeur pour lui associer les différentes routes
const router = Router();
// liste de toutes les routes pour le dossier
/**
 * @swagger
 * /addresses:
 *   get:
 *     summary: Get all addresses
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get("/", authMiddleware, getAll);

/**
 * @swagger
 * /addresses/{id}:
 *   get:
 *     summary: Get an address by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
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
 * /addresses:
 *   post:
 *     summary: Create a new address
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Notification.yaml'
 *     responses:
 *       201:
 *         description: Resource created
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */

router.post("/", authMiddleware, create);
/**
 * @swagger
 * /addresses/{id}:
 *   delete:
 *     summary: Delete an existing address
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Resource deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 *
 */
router.delete("/:id", authMiddleware, deleteUser);
/**
 * @swagger
 * /addresses:
 *   put:
 *     summary: Update an existing address
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Resource updated
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 *
 */
router.put("/:id", authMiddleware, update);

export default router;

