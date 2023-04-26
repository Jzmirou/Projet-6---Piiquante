import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();

export const JwtVerify = (token) => {
    try {
        const tokenVerified = jwt.verify(token, process.env.JWT_KEY);
        return [null, tokenVerified]
    } catch (error) {
        return [error, null]
    }
};
