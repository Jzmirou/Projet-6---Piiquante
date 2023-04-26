import express from "express";
import {dirname, join} from "node:path"
import { fileURLToPath } from "url";
import cors from "cors";
import helmet from "helmet"
import mongoSanitize from "express-mongo-sanitize"
import rateLimit from "express-rate-limit"
import { router as routerUser } from "./src/routes/usersRoute.js";
import { router as routerSauce } from "./src/routes/saucesRoute.js";
import { errorHandler } from "./src/middlewares/errorHandler.js";
import { logger } from "./src/helper/winston.js";
import swaggerUi from "swagger-ui-express"
import { swaggerSpec } from "./config/swagger.config.js";
import { rateLimitConfig } from "./config/rateLimit.config.js";
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename);

export const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}))
app.use(express.json());

/************************
 ******* Sécurité *******
 ************************/

// Sécurise les données reçu afin d’empêché les attaques par injection mongoDB (NoSql Injection)
app.use(mongoSanitize())
// Ajoute les headers de sécurité
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
// Limite le nombres d'appels au serveur faite par une même ip 
const limiter = rateLimit(rateLimitConfig)
app.use(limiter)

/************************
 ******** Routes ********
 ************************/
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec) )
app.use("/api/auth", routerUser);
app.use("/api/sauces", routerSauce);
app.use("/images", express.static(join(__dirname, "images")))

/************************
 **** Error Handling ****
 ************************/

app.use(errorHandler);

// Attrapez tous les refus de promesse non gérés
process.on('unhandledRejection', error => {
    throw error
   })
// // Attrapez toutes les erreurs non interceptées
process.on("uncaughtException", async (error) => {  
    if (!isOperationalError(error)) {
		logger.error(error)
        process.exit(1);
    }
});
