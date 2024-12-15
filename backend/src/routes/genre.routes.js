import { Router } from "express";

import {
  createGenreController,
  deleteGenreController,
  fetchGenresController,
  genreDetailController,
  updateGenreController,
} from "../controllers/genre.controllers.js";
import {
  isAdmin,
  isVerified,
  verifyUser,
} from "../middlewares/auth.middleware.js";

const router = new Router();

// Routes
router.route("/all").get(fetchGenresController);
router.route("/").get(genreDetailController);
router.route("/").post(verifyUser, isVerified, isAdmin, createGenreController);
router.route("/").patch(verifyUser, isVerified, isAdmin, updateGenreController);
router
  .route("/")
  .delete(verifyUser, isVerified, isAdmin, deleteGenreController);

export default router;
