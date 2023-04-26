import { Api400Error} from "../helper/error/errorCustom.js";
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
        if(!findSauces) throw new Api400Error('Aucune sauce trouvé')
        return [null, findSauces]
    } catch (error) {
        return [error, null]
    }
};

/**
 * Retourne une sauce spécifique, à partir de son id, enregistré dans la base de données
 * @param {string} id 
 * @returns {Promise<SauceData>}
 */
export const findOneSauceById = async (id) => {
    try {
        const findSauce = await Sauce.findOne({_id: id})
        if(!findSauce) throw new Api400Error('Aucune sauce trouvé')
        return [null, findSauce]
    } catch (error) {
        return [error, null]
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
        if(!sauceCreated) throw new Api400Error('Sauce non créer')
        return [null, sauceCreated]
    } catch (error) {
        return [error, null]
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
          if(!newSauce) throw new Api400Error('Sauce non mis à jour')
        return [null, newSauce]
    } catch (error) {
        return [error, null]
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
        if(!deletedSauce) throw new Api400Error('Sauce non supprimez')
        return [null, deletedSauce]
    } catch (error) {
        return [error, null]
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
          if(!update) throw new Api400Error('Like non ajouté')
        return [null, update]
    } catch (error) {
        return [error, null]
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
        if(!update) throw new Api400Error('Dislike non ajouté')
        return [null, update]
    } catch (error) {
       return [error, null]
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
        if(!update) throw new Api400Error('Like non supprimez')
        return [null, update]
    } catch (error) {
        return [error, null]
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
        if(!update) throw new Api400Error('Dislike non supprimez')
        return [null, update]
    } catch (error) {
        return [error, null]
    }
}
