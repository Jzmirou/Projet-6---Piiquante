import { Api400Error, Api403Error, Api404Error, Api500Error } from "../helper/error/errorCustom.js";
import { addDislikeSauceById, addLikeSauceById, createSauce, deleteSauceById, findAllSauces, findOneSauceById, removeDislikeSauceById, removeLikeSauceById, updateSauceById } from "../services/sauceService.js";
import * as fs from "fs";
import { validate, validateForUpdate } from "../models/Sauce.js";

/**
 * Récupère et renvoie touts les sauces au client
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
export const getAllSauces = async (req, res, next) => {
    try {
        const [error, sauces] = await findAllSauces();
        if(error) throw new Api500Error(error.message)
        res.status(200).json(sauces);
    } catch (error) {
        next(error);
    }
};
/**
 * Cherche et renvoie une sauce au client à partir de l'ID dans les paramètres de la requête.
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
export const getOneSauce = async (req, res, next) => {
    try {
        // Récupère la sauce dans la base de données
        const [error, sauce] = await findOneSauceById(req.params.id);
        if (error) throw new Api404Error("Sauce non trouvé");
        res.status(200).json(sauce);
    } catch (error) {
        next(error);
    }
};
/**
 * Ajoute une sauce et un envoie un message si c'est le cas
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
export const addSauce = async (req, res, next) => {
    try {
        if(!req.file) throw new Api400Error('Veuillez ajouter une image à votre sauce')
        if(!req.body.sauce) throw new Api400Error('Aucun information récupéré dans la requête')
        const dataSauceClient = await JSON.parse(req.body.sauce);
        delete dataSauceClient._id;
        const imgUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
        /**
         * Objet de données utilisé pour ajouté une nouvelle sauce
         * @type {import("../services/sauceService.js").SauceData}
         */
        const sauceObject = {...dataSauceClient, imageUrl: imgUrl}
        const {error} = validate(sauceObject)
        if(error) throw new Api400Error(error.message)

        const [errorSauceSaved, sauceSaved] = await createSauce(sauceObject);
        if (errorSauceSaved) throw new Api400Error("l'enregistrement de la sauce c'est mal passé");
        res.status(201).json({ message: "Sauces Créer" });
    } catch (error) {
        next(error);
    }
};
/**
 * Met à jour les données d'une sauce dans la base de donnée
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
export const updateSauce = async (req, res, next) => {
    try {
        const sauceId = req.params.id;

        const [errorFindSauce, sauce] = await findOneSauceById(sauceId);
        if (errorFindSauce) throw new Api400Error("Aucune sauce ne correspond à l'id reçu en paramètre")
        
        if (req.userId !== sauce.userId) throw new Api400Error("Vous n’êtes pas autorisé a modifie cette sauce");
        if (!sauceId) throw new Api400Error("Aucun id de sauce n'est transmit dans la requête");
        /**
         * Objet de données utilisé pour modifié une sauce
         * @type {import("../services/sauceService.js").SauceData}
        */
       let sauceUpdate;
       const newImage = req.file;
        if (newImage) {
            const sauceObject = await JSON.parse(req.body.sauce);
            const filename = sauce.imageUrl.split("/").at(-1);
            fs.unlinkSync(`images/${filename}`);
            const imgUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
            sauceUpdate = { ...sauceObject, imageUrl: imgUrl };
        } else {
            const sauceObject = req.body;
            sauceUpdate = { ...sauceObject };
        }

        const {error} = validateForUpdate(sauceUpdate)
        if (error) throw new Api400Error(error.message)

        const [errorSauceUpdated, sauceUpdated] = await updateSauceById(sauceId, sauceUpdate);
        if (errorSauceUpdated) throw new Api400Error('Sauce non mis à jour')

        res.status(200).json({ message: "sauce mis à jour" });
    } catch (error) {
        next(error);
    }
};
/**
 * Supprime une sauce dans la base de donnée
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
export const deleteSauce = async (req, res, next) => {
    try {
        const sauceId = req.params.id;
        const [errorFindSauce, sauce] = await findOneSauceById(sauceId);
        if (errorFindSauce) throw new Api400Error("Aucune sauce ne correspond à l'id reçu en paramètre")

        if (req.userId !== sauce.userId) throw new Api400Error("Vous n’êtes pas autorisé a supprimez cette sauce");
        if (!sauceId) throw new Api400Error("Aucun id de sauce n'est transmit dans la requête");

        const filename = sauce.imageUrl.split("/").at(-1);
        fs.unlinkSync(`images/${filename}`);

        const [error, sauceDeleted] = await deleteSauceById(sauceId);
        if (error) throw new Api400Error("Aucune sauce ne correspond à l'id reçu en paramètre")

        res.status(200).json("Sauce supprimé");
    } catch (error) {
        next(error);
    }
};
/**
 * Permet de liker ou disliker une sauce
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
export const likeSauce = async (req, res, next) => {
    try {
        const sauceId = req.params.id;
        const reqLike = Number(req.body.like);
        const isLikeValid = [1,0,-1].includes(reqLike)
        if(!isLikeValid) throw new Api400Error('Like invalide, le like doit être égale à 0, 1 ou -1')
        const [errorSauceFind, sauceFind] = await findOneSauceById(sauceId);
        if(errorSauceFind) throw new Api400Error("Aucune sauce ne correspond à l'id reçu en paramètre")
        if (!sauceId) throw new Api400Error("Aucun id de sauce n'est transmit dans la requête");
        if (reqLike !== 0 && !reqLike) throw new Api400Error("Aucune donnés reçus");
        switch (reqLike) {
            case 1:
                if (sauceFind.usersLiked.includes(req.userId)) throw new Api400Error("Cet utilisateur à déjà liké")
                if (sauceFind.usersDisliked.includes(req.userId)) throw new Api400Error("Cet utilisateur à déjà dislike");
                const [errorSauceLiked, sauceLiked] = await addLikeSauceById(sauceId, req.userId)
                if(errorSauceLiked) throw new Api400Error('Sauce non like paramètre incorrect')
                break
            case -1:
                if (sauceFind.usersDisliked.includes(req.userId)) throw new Api400Error("Cet utilisateur à déjà dislike");
                if (sauceFind.usersLiked.includes(req.userId)) throw new Api400Error("Cet utilisateur à déjà liké")
                const [errorSauceDisliked, sauceDisliked] = await addDislikeSauceById(sauceId, req.userId)
                if(errorSauceDisliked) throw new Api400Error('Sauce non dislike paramètre incorrect')
                break
            case 0:
                if (sauceFind.usersLiked.includes(req.userId)) {
                    const [errorLikeRemoved, likeRemoved] = await removeLikeSauceById(sauceId, req.userId)
                    if (errorLikeRemoved) throw new Api400Error('Like non supprimé')
                    break
                } else if (sauceFind.usersDisliked.includes(req.userId)) {
                    const [errorDislikeRemoved, dislikeRemoved] = await removeDislikeSauceById(sauceId, req.userId)
                    if(errorDislikeRemoved) throw new Api400Error('Dislike non supprimé')
                    break
                }
        }
        res.status(200).json({message: "Sauce like/dislike"})
    } catch (error) {
        next(error)
    }
};
