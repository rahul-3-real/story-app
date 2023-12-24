import "dotenv/config";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import authRouter from "./routes/user.routes.js";
import genreRouter from "./routes/genre.routes.js";

// Creating App
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/genres", genreRouter);

export { app };
