import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { AppRouter } from "./AppRouter";
import "./controllers/LoginController";
import "./controllers/RootController";
const app = express();

app.use(express.static(__dirname + './public'));
app.use(cors());
app.use(cookieParser());
app.use(AppRouter.getInstance());

app.listen(3030, () => {
    console.log("Listening on http://localhost:3030");
});