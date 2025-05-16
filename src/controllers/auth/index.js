import { Router } from "express";
import login from "./login.js";
import authMe from "./authMe.js";
import authMiddleware from "../../middlewares/authMiddleware.js";

const router = Router();
/**
 * @swagger
 * /auth/login:
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
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
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

/**
 * @swagger
 * /auth:
 *   get:
 *     summary: Authenticate a user
 *     tags: [Auth]
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
router.get("/authMe", authMiddleware, authMe);

export default router;
