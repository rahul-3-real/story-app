import { Router } from "express";

import { fetchGenresController } from "../controllers/genre.controllers.js";

const router = new Router();

// Routes
router.route("/all").get(fetchGenresController);

export default router;
