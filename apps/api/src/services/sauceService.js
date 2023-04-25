import { Api400Error, Api404Error, Api500Error } from "../helper/error/errorCustom.js";
import { Sauce } from "../models/Sauce.js";

/**
 * Modèle représentant les données d'un utilisateur dans la base de donnée
 * @typedef {Object} SauceData
 * @property {String} userId
 * @property {String} name
 * @property {String} manufacturer
 * @property {String} description
 * @property {String} mainPepper
 * @property {String} imageUrl
 * @property {Number} heat
 * @property {Number} likes
 * @property {Number} dislikes
 * @property {Array} usersLiked
 * @property {Array} usersDisliked
 */

/**
 * Retourne toute les sauces enregistré dans la base de données
 * @returns {Promise<SauceData[]>}
 */
export const findAllSauces = async () => {
    try {
        const findSauces = await Sauce.find()
        if( !findSauces) throw new Api500Error('Problème serveur')
        return findSauces
    } catch (error) {
        throw error
    }
};

/**
 * Retourne une sauce spécifique, à partir de son id, enregistré dans la base de données
 * @param {string} id 
 * @returns {Promise<SauceData>}
 */
export const findOneSauceById = async (id) => {
    try {
        const findSauce = await Sauce.findById(id)
        return findSauce
    } catch (error) {
        throw new Api404Error('Sauce non trouvé')
    }
};

/**
 * Enregistre une sauce dans la base de données
 * @param {Object} sauce 
 * @param {string} imageUrl
 * @returns {Promise<SauceData>}
 */
export const createSauce = async (sauce) => {
    try {
        const sauceCreated = await Sauce.create({
            ...sauce, 
            likes: 0,
            dislikes: 0,
            usersLiked: [],
            usersDisliked: []
        });
        return sauceCreated
    } catch (error) {
        throw new Api400Error("Sauce non créer")
    }
};
/**
 * Met à jour une ou plusieurs informations sur une sauce à partir de son ID
 * @param {String} id 
 * @param {Object} sauce 
 * @returns {Promise<SauceData>}
 */
export const updateSauceById = async (id ,sauce) => {
    try {
        const newSauce = await Sauce.findOneAndUpdate({_id: id }, sauce, {
            returnOriginal: false
          });
          return newSauce
    } catch (error) {
        throw new Api400Error('Sauce non update')
    }
}
/**
 * Supprime une sauce de la base de données à partir de son ID
 * @param {String} id 
 * @returns {Promise<SauceData>}
 */
export const deleteSauceById = async (id) => {
    try {
        const deletedSauce = await Sauce.deleteOne({_id: id})
        return deletedSauce
    } catch (error) {
        throw new Api400Error('Sauce non supprimé')
    }
}
/**
 * Ajoute un like, et son auteur, sur une sauce à partir de son ID
 * @param {String} id 
 * @param {String} userId 
 * @returns {Promise<SauceData>}
 */
export const addLikeSauceById = async (id, userId) => {
    try {
        const update = await Sauce.findOneAndUpdate({_id: id}, { $inc: { likes: 1 }, $push: { usersLiked: userId } }, {
            returnOriginal: false
          })
        return update
    } catch (error) {
        throw new Api400Error('Like non ajouté')
    }
}
/**
 * Ajoute un dislike, et son auteur, sur une sauce à partir de son ID
 * @param {String} id 
 * @param {String} userId 
 * @returns {Promise<SauceData>}
 */
export const addDislikeSauceById = async (id, userId) => {
    try {
        const update = await Sauce.findByIdAndUpdate(id, { $inc: { dislikes: 1 }, $push: { usersDisliked: userId } })
        return update
    } catch (error) {
        throw new Api400Error('Dislike non ajouté')
    }
}
/**
 * Supprime un like, et son auteur, sur une sauce à partir de son ID
 * @param {String} id 
 * @param {String} userId 
 * @returns {Promise<SauceData>}
 */
export const removeLikeSauceById = async (id, userId) => {
    try {
        const update = await Sauce.findByIdAndUpdate(id, { $inc: { likes: -1 }, $pull: { usersLiked: userId } })
        return update
    } catch (error) {
        throw new Api400Error('Like non supprimé')
    }
}
/**
 * Supprime un like, et son auteur, sur une sauce à partir de son ID
 * @param {String} id 
 * @param {String} userId 
 * @returns {Promise<SauceData>}
 */
export const removeDislikeSauceById = async (id, userId) => {
    try {
        const update = await Sauce.findByIdAndUpdate(id, { $inc: { dislikes: -1 }, $pull: { usersDisliked: userId } })
        return update
    } catch (error) {
        throw new Api400Error('Dislike non ajouté')
    }
}
