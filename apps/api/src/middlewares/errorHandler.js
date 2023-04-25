import { isOperationalError } from "../helper/error/function.js"

/**
 * Middleware Permettant la gestion des erreurs
 * @param {Error} err
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
export const errorHandler = (error, req, res, next) => {
    if(!isOperationalError(error)) {
        // next(error)
        return;
    }
    res.status(error.statusCode).json(error)
    //logger here
}