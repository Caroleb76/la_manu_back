import getAll from "./getAll.js";
import destroy from "./destroy.js";
import create from "./create.js";
import getById from "./getById.js";
import update from "./update.js";
import { Router } from "express";
import authMiddleware from "../../middlewares/authMiddleware.js";

//récupération du routeur pour lui associer les différentes routes
const router = Router();
// liste de toutes les routes pour le dossier
//get = récupérer les infos

/**
 * @swagger
 * /moduleFormations:
 *   get:
 *     tags : [moduleFormation]
 *     summary: Get all module formations
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
 * /moduleFormations/{id}:
 *   get:
 *     tags : [moduleFormation]
 *     summary: Get a module formation by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
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
 * /moduleFormations/{id}:
 *   delete:
 *     tags : [moduleFormation]
 *     summary: Delete a module formation by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
// destroy = supprimer les infos
router.delete("/:id", authMiddleware, destroy); //"api/v1/moduleFormations/"

/**
 * @swagger
 * /moduleFormations:
 *   post:
 *     tags : [moduleFormation]
 *     summary: Create a new module formation
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
// post = envoyer les infos dans un formulaire
router.post("/", authMiddleware, create);

/**
 * @swagger
 * /moduleFormations:
 *   put:
 *     tags : [moduleFormation]
 *     summary: Update an existing module formation
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
// put = remplacer tous les champs et patch = modifier un seul champ
router.put("/", authMiddleware, update);

export default router;