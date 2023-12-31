import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRouter from "./routes/user.routes.js";
import genreRouter from "./routes/genre.routes.js";
import storyRouter from "./routes/story.routes.js";

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes
app.get("/api", (req, res) => res.send("Server Started"));
app.use("/api/auth", userRouter);
app.use("/api/genres", genreRouter);
app.use("/api/stories", storyRouter);

export { app };
