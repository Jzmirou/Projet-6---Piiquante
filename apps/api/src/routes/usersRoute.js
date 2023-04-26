import {Router} from "express"
import * as userCtrl from  "../controllers/userCtrl.js"

export const router = Router()

/**
 * @swagger
 * api/auth/signup:
 *   post:
 *     tags:
 *       - Users
 *     name: Register
 *     summary: "Inscrit un nouvel utilisateur et renvoie un token d'identification"
 *     description: Cette route permet d'inscrire un nouvel utilisateur dans la base de données da l'application web Piiquante
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *               format: password
 *         required:
 *           - email
 *           - password
 *     responses:
 *       '201':
 *         description: Utilisateur créer
 *       '400':
 *         description: Utilisateur non créer
 *       '403':
 *         description: Utilisateur déjà enregistré
 */
router.post("/signup", userCtrl.signUp)

/**
 * @swagger
 * api/auth/login:
 *   post:
 *     tags:
 *       - Users
 *     name: Login
 *     summary: "Connecte utilisateur et renvoie un token d'identification"
 *     description: Cette route permet de connecter un utilisateur à l'application web Piiquante
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *               format: password
 *         required:
 *           - email
 *           - password
 *     responses:
 *       '200':
 *         description: Utilisateur connecté avec succès
 *       '401':
 *         description: Email ou mot de passe invalide
 */
router.post("/login", userCtrl.login)