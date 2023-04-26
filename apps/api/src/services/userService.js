import { User } from "../models/User.js";

/**
 * Modèle représentant les données d'un utilisateur dans la base de donnée
 * @typedef {Object} UserData
 * @property {String} email
 * @property {String} password
 */

/**
 * Créer un nouvel utilisateur dans la base de données
 * @param {UserData}  
 * @returns {Promise<UserData>}
 */
export const createUser = async (user) => {
    try {
        const dataToSave = await User.create(user)
        return [null ,dataToSave]
    } catch (error) {
        return [error, null]
    }
}
/**
 * Récupère un utilisateur dans la base de donnés a partir de son email
 * @param {String} email 
 * @returns {Promise<UserData> | undefined}
 */
export const findUserByEmail = async (email) => {
    try {
        const user = await User.findOne({email: email})
        return [null, user]
    } catch (error) {
        return [error, null]
    }
}
/**
 * Récupère un utilisateur dans la base de donnés a partir de son ID
 * @param {String} id 
 * @returns {Promise<UserData> | undefined} 
 */
export const findUserById = async (id) => {
    try {
        const user = await User.findById(id)
        return [null, user]
    } catch (error) {
        return [error, null]
    }
}
