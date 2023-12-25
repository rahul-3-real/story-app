import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createGenre,
  fetchAllGenres,
} from "../controllers/genre.controllers.js";

const genreRouter = Router();

genreRouter.get("/", fetchAllGenres);
genreRouter.post("/", verifyJWT, createGenre);

export default genreRouter;
