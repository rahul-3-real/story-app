import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRouter from "../routes/user.routes.js";
import tagRouter from "../routes/tag.routes.js";
import { errorHandler } from "../utils/apiError.js";

const app = express();

// CORS Options
const corsOptions = {
  origin: process.env.CORS_OPTIONS.split(","),
  credentials: true,
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// Serve static files
app.use(express.static("public"));
app.use("/static", express.static(process.env.MEDIA_UPLOAD_FOLDER));

// Routes
app.use("/api/user", userRouter);
app.use("/api/tags", tagRouter);

// Test Route
app.get("/api", (req, res) => {
  res.status(200).json({
    message: "🟩 API is working!",
  });
});

// Error handling middleware
app.use(errorHandler);

export default app;
