import mongoose from "mongoose";
import { customJoi as Joi } from "../helper/CustomJoi.js"

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
        userId: Joi.string().required().escapeHTML(),
        name: Joi.string().required().escapeHTML(),
        manufacturer: Joi.string().required().escapeHTML(),
        description: Joi.string().required().escapeHTML(),
        mainPepper: Joi.string().required().escapeHTML(),
        imageUrl: Joi.string().required().escapeHTML(),
        heat: Joi.number().min(1).max(10).required(),
        likes: Joi.number(),
        dislikes: Joi.number(),
        usersLiked: Joi.array().items(Joi.string().escapeHTML()),
        usersDisliked: Joi.array().items(Joi.string().escapeHTML()),
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
        userId: Joi.string().escapeHTML(),
        name: Joi.string().escapeHTML(),
        manufacturer: Joi.string().escapeHTML(),
        description: Joi.string().escapeHTML(),
        mainPepper: Joi.string().escapeHTML(),
        imageUrl: Joi.string().escapeHTML(),
        heat: Joi.number().min(1).max(10),
        likes: Joi.number(),
        dislikes: Joi.number(),
        usersLiked: Joi.array().items(Joi.string().escapeHTML()),
        usersDisliked: Joi.array().items(Joi.string().escapeHTML()),
    });
    return schema.validate(sauce);
}

export const Sauce = mongoose.model("Sauce", sauceSchema)