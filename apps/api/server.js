import dotenv from "dotenv";
import mongoose from "mongoose";
import { app } from "./app.js";

dotenv.config();

const url = process.env.DATABASE_URL;

mongoose.connect(url)
    .then(() => console.log("DB connection successful"))
    .catch((error) => console.log(error));

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});
