/********************************************** IMPORTS **************************************************/
import { fileURLToPath } from "url";
import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";

import multer from "multer";

import { register } from "./controllers/auth.js";
import auth from "./routes/auth.js";
import users from "./routes/users.js";

import mongoose from "mongoose";

/****************************************** CONFIGURATIONS **********************************************/
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

/******************************************** FILE STORAGE **********************************************/
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

/********************************************** ROUTES **************************************************/
app.post("/auth/register", upload.single("picture"), register);

app.use("/auth", auth);
app.use("/users", users);


/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(function () {
    app.listen(PORT, function () {
        console.log(`Server port : ${PORT}`);
    });
}).catch(function (error) {
    console.log(`${error} did not connect`);
});