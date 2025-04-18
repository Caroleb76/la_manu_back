import { Router } from "express";
import login from "./login.js";

const router = Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     description: Authenticate a user with their email and password, and return a token for subsequent requests.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Login'
 *       400:
 *         description: Bad Request (e.g., invalid email/password)
 *       401:
 *         description: Unauthorized (invalid credentials)
 *       500:
 *         description: Internal Server Error
 *     security:
 *       - bearerAuth: []
 */
router.post("/login", login);

export default router;
