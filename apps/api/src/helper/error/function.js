import { BaseError } from "./errorCustom.js";

/**
 * Vérifie si une erreur est operational
 * @param {Error} error 
 * @returns {Boolean}
 */
export const isOperationalError = error => {
    if (error instanceof BaseError) {
        return error.isOperational;
    }
    return false;
};
