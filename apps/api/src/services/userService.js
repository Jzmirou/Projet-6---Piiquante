import { User } from "../models/User.js";
import { Api400Error, Api500Error } from '../helper/error/errorCustom.js';

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
        if(!dataToSave) throw new Api500Error("l'enregistrement de l'utilisateur c'est mal passé")
        return dataToSave
    } catch (error) {
        throw error
    }
}
/**
 * Récupère un utilisateur dans la base de donnés a partir de son email
 * @param {String} email 
 * @returns {Promise<UserData> | undefined}
 */
export const findUserByEmail = async (email) => {
        let user = await User.findOne({email: email})
        if (!user) return undefined
        return user
}
/**
 * Récupère un utilisateur dans la base de donnés a partir de son ID
 * @param {String} id 
 * @returns {Promise<UserData> | undefined} 
 */
export const findUserById = async (id) => {
        let user = await User.findById(id)
        if (!user) return undefined
        return user
}
