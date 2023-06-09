import HmacSHA256 from "crypto-js/hmac-sha256.js";
import { hash, verify } from "@phc/argon2";
import { Api400Error, Api401Error, Api403Error, Api404Error } from "../helper/error/errorCustom.js";
import { createUser, findUserByEmail } from "../services/userService.js";
import jwt from "jsonwebtoken";
import { validate } from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

/**
 * Permet d'enregistrer un nouvel utilisateur
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export const signUp = async (req, res, next) => {
    const { body } = req;
    try {
        // Vérifie si les information utilisateur ont bien été reçue
        if (!body.email || !body.password) throw new Api400Error("Les information de l'utilisateur sont requise");
        const { email, password } = body;

        // Cryptage de l'email et du mot de passe avant l'enregistrement dans la base de données
        const emailSecure = HmacSHA256(email, process.env.CRYPTO_KEY_EMAIL).toString();
        const passwordSecure = await hash(password);
        
        // Vérifie si l'email est déjà enregistré dans la base de données
        const [errorFind, userFind] = await findUserByEmail(emailSecure);
        if (userFind) throw new Api403Error("Cette adresse email est déjà utilisé");
        // Vérifie la validité des données enregistré
        const userObject = { email: email, password: password };
        const { error: validateError } = validate(userObject);
        if (validateError) throw new Api400Error(validateError.message);

        // Enregistrement d'un nouvel utilisateur dans la base de données
        const userObjectSecure = { email: emailSecure, password: passwordSecure };
        const [error, data] = await createUser(userObjectSecure);
        if(error) throw new Api400Error(error)
        res.status(201).json(data);
    } catch (error) {
        next(error);
    }
};
/**
 * Permet de connecter un utilisateur
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export const login = async (req, res, next) => {
    const { body } = req;
    try {
        // Vérifie si les information utilisateur ont bien été reçue
        if (!body.email || !body.password) throw new Api400Error("Les information ne utilisateur ne sont pas entrée");
        const { email, password } = body;

        // Vérifie la validité des données reçus
        const { error } = validate(body);
        if (error) throw new Api400Error(error.message);

        // Cryptage de l'email afin de pouvoir le comparer à la base de données
        const emailSecure = HmacSHA256(email, process.env.CRYPTO_KEY_EMAIL).toString();
        const [errorFind, userFind] = await findUserByEmail(emailSecure);
        if (!userFind) throw new Api401Error("Utilisateur non trouvé, veuillez créer un compte");

        // Vérifie si le password reçu correspond avec celui de la base de données
        const isPasswordGood = await verify(userFind.password, password);
        if (!isPasswordGood) throw new Api401Error("Mot de passe incorrect");

        res.status(200).json({
            userId: userFind._id,
            token: jwt.sign({ sub: userFind._id }, process.env.JWT_KEY, { expiresIn: "24h" }),
        });
    } catch (error) {
        next(error);
    }
};
