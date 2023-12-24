import { Router } from "express";
import { getAllGenres } from "../controllers/genre.controllers.js";

const genreRouter = Router();

genreRouter.get("/", getAllGenres);

export default genreRouter;
