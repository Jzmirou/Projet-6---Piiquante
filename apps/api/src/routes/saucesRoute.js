import { Router } from "express";
import * as sauceCtrl from "../controllers/sauceCtrl.js";
import { auth } from "../middlewares/auth.js";
import { multerConfig } from "../middlewares/multerConfig.js";

export const router = Router();
/**
 * @swagger
 * api/sauces:
 *   get:
 *     tags:
 *       - Sauces
 *     name: Get all sauce
 *     summary: "Récupère toute les sauces dans la base de données"
 *     description: Cette route permet de récupérer toutes les sauces enregistrer dans la base de données
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: Sauces récupéré
 *       '500':
 *         description: Sauce non récupéré, problème dans la base de donnée
 */
router.get("/", auth, sauceCtrl.getAllSauces);

/**
 * @swagger
 * api/sauces:
 *   post:
 *     tags:
 *       - Sauces
 *     name: Post Sauce
 *     summary: "Enregistre une nouvelle sauce"
 *     description: Cette route permet d'enregistrer une nouvelle sauce dans la base de données
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: sauce
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             manufacturer:
 *               type: string
 *             description:
 *               type: string
 *             mainPepper:
 *               type: string
 *             heat:
 *               type: string
 *             userId:
 *               type: string
 *         required:
 *           - name
 *           - manufacturer
 *           - description
 *           - mainPepper
 *           - heat
 *           - userId
 *       - name: Image
 *         in: body
 *         type: jpeg | png | webp
 *         description: Image
 *         required: true
 *     responses:
 *       '201':
 *         description: Sauce créer avec succès
 *       '400':
 *         description: Sauce non créer
 */
router.post("/", auth, multerConfig, sauceCtrl.addSauce);

/**
 * Get one sauce
 * @swagger
 * api/sauces/:id:
 *   get:
 *     tags:
 *       - Sauces
 *     name: Get all sauce
 *     summary: "Récupère toute les sauces dans la base de données"
 *     description: Cette route permet de récupérer toutes les sauces enregistrer dans la base de données
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: "Sauce ID"
 *         in: "path"
 *         type: 'integer'
 *         required: true
 *     responses:
 *       '200':
 *         description: Sauce récupéré avec succès
 *       '404':
 *         description: Sauce non trouvé
 */
router.get("/:id", auth, sauceCtrl.getOneSauce);

/**
 * @swagger
 * api/sauces/:id:
 *   put:
 *     tags:
 *       - Sauces
 *     name: Put Sauce
 *     summary: "Modifie une sauce"
 *     description: Cette route permet de modifié une sauce dans la base de données
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: "Sauce ID"
 *         in: "path"
 *         type: 'integer'
 *         required: true
 *       - name: sauce
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             manufacturer:
 *               type: string
 *             description:
 *               type: string
 *             mainPepper:
 *               type: string
 *             heat:
 *               type: string
 *             userId:
 *               type: string
 *       - name: Image
 *         in: body
 *         type: jpeg | png | webp
 *         description: Image
 *     responses:
 *       '200':
 *         description: Sauce modifié
 *       '400':
 *         description: Sauce non modifié
 */
router.put("/:id", auth, multerConfig, sauceCtrl.updateSauce);

/**
 * @swagger
 * api/sauces/:id:
 *   delete:
 *     tags:
 *       - Sauces
 *     name: Delete sauce
 *     summary: "Supprime une sauce dans la base de données"
 *     description: Cette route permet de supprimer une sauce enregistrer dans la base de données
 *     parameters:
 *       - name: "Sauce ID"
 *         in: "path"
 *         type: 'integer'
 *         required: true
 *     responses:
 *       '200':
 *         description: Sauce supprimer
 *       '400':
 *         description: Sauce non supprimer
 */
router.delete("/:id", auth, sauceCtrl.deleteSauce);
/**
 * @swagger
 * api/sauces/:id/like:
 *   post:
 *     tags:
 *       - Sauces
 *     name: add or remove like/dislike
 *     summary: "Ajoute ou supprime un like/dislike d'une sauce"
 *     description: Cette route permet de d'ajouter ou supprimer un like/dislike d'une sauce enregistrer dans la base de données
 *     parameters:
 *       - name: "Sauce ID"
 *         in: "path"
 *         type: 'integer'
 *         required: true
 *       - name: "Like"
 *         in: "body"
 *         type: 'number'
 *         required: true
 *         description: 1 | 0 | -1
 *     responses:
 *       '200':
 *         description: Sauce liké avec succès
 *       '400':
 *         description: Sauce non liké
 */
router.post("/:id/like", auth, sauceCtrl.likeSauce);
