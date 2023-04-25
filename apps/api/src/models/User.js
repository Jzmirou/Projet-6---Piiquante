import mongoose from "mongoose"
import mongooseUniqueValidator from "mongoose-unique-validator"
import { customJoi as Joi } from "../helper/CustomJoi.js"
const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true }
})

userSchema.plugin(mongooseUniqueValidator)

/**
 * Validateur des données d'un utilisateur créer
 * @param {import("../services/userService").UserData} user 
 * @returns {Object}
 */
export const validate = (user) => {
    const schema = Joi.object({
        email: Joi.string().email().required().escapeHTML(),
        password: Joi.string().required().escapeHTML(),
    });
    return schema.validate(user);
};

export const User = mongoose.model("User", userSchema);
