import express from "express";
import {dirname, join} from "node:path"
import { fileURLToPath } from "url";
import cors from "cors";
import helmet from "helmet"
import mongoSanitize from "express-mongo-sanitize"
import rateLimit from "express-rate-limit"
import { router as routerUser } from "./src/routes/usersRoute.js";
import { router as routerSauce } from "./src/routes/saucesRoute.js";

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename);

export const app = express();

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limitez chaque adresse IP à 100 requêtes par fenêtre (ici, par période de 15 minutes).
})

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
app.use(limiter)

/************************
 ******** Routes ********
 ************************/

app.use("/api/auth", routerUser);
app.use("/api/sauces", routerSauce);
app.use("/images", express.static(join(__dirname, "images")))

