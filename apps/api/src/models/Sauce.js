import mongoose from "mongoose";
import Joi from "joi"

const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true, min: 1, max: 10 },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    usersLiked: { type: [String], default: [] },
    usersDisliked: { type: [String], default: [] },
})
/**
 * Validateur des données d'une nouvelle sauce créer
 * @param {import("../services/sauceService").SauceData} sauce 
 * @returns {Object}
 */
export const validate = (sauce) => {
    const schema = Joi.object({
        userId: Joi.string().required(),
        name: Joi.string().required(),
        manufacturer: Joi.string().required(),
        description: Joi.string().required(),
        mainPepper: Joi.string().required(),
        imageUrl: Joi.string().required(),
        heat: Joi.number().min(1).max(10).required(),
        likes: Joi.number(),
        dislikes: Joi.number(),
        usersLiked: Joi.array(),
        usersDisliked: Joi.array(),
    });
    return schema.validate(sauce);
};
/**
 * Validateur des données d'une sauce mis à jour
 * @param {import("../services/sauceService").SauceData} sauce 
 * @returns {Object}
 */
export const validateForUpdate = (sauce) => {
    const schema = Joi.object({
        userId: Joi.string(),
        name: Joi.string(),
        manufacturer: Joi.string(),
        description: Joi.string(),
        mainPepper: Joi.string(),
        imageUrl: Joi.string(),
        heat: Joi.number().min(1).max(10),
        likes: Joi.number(),
        dislikes: Joi.number(),
        usersLiked: Joi.array(),
        usersDisliked: Joi.array(),
    });
    return schema.validate(sauce);
}

export const Sauce = mongoose.model("Sauce", sauceSchema)