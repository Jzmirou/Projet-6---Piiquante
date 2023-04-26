import dotenv from "dotenv";
import { Api401Error } from "../helper/error/errorCustom.js";
import { findUserById } from "../services/userService.js";
import { JwtVerify } from "../helper/jwt.js";
dotenv.config();

/**
 * Middleware Permettant de vérifié la validité du token d'authentification
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export const auth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) throw new Api401Error("Accès refusé");

        const authToken = req.header("Authorization").replace("Bearer ", "");
        if (!authToken) throw new Api401Error("Pas de token dans la requête");

        const [errorTokenVerified, tokenVerified] = JwtVerify(authToken);
        if (errorTokenVerified) throw new Api401Error("Token non valide Accès refusé");

        const [errorFind, userFind] = await findUserById(tokenVerified.sub);
        if (errorFind) throw new Api401Error("Aucun utilisateur valide n'est associé au token");

        req.userId = tokenVerified.sub;
        next();
    } catch (error) {
        next(error);
    }
};
