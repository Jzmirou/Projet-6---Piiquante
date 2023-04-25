import jwt from "jsonwebtoken";
import { Api400Error } from "../helper/error/errorCustom.js";
import { User } from "../models/User.js";

/**
 * Middleware Permettant de vérifié la validité du token d'authentification
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
export const auth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer "))
            throw new Api400Error("Accès refusé");
        const authToken = req.header("Authorization").replace("Bearer ", "");
        if (!authToken) throw new Api400Error("Pas de token dans la requête");
        jwt.verify(authToken, process.env.JWT_KEY, (err, decoded) => {
            if (err) throw new Api400Error("Token non valide Accès refusé");
            const userFind = User.findOne({ _id: decoded.sub });
            if (!userFind) {
                throw new Api400Error("Aucun utilisateur valide n'est associé au token");
            }
            req.userId = decoded.sub
            next();
        });
    } catch (error) {
        next(error);
    }
};
