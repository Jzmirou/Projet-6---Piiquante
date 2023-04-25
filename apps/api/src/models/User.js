import mongoose from "mongoose"
import mongooseUniqueValidator from "mongoose-unique-validator"
import Joi from "joi"

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
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });
    return schema.validate(user);
};

export const User = mongoose.model("User", userSchema);
