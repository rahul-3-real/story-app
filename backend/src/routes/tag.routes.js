import { Router } from "express";

import { verifyUser } from "../middlewares/auth.middleware.js";
import {
  createTagController,
  fetchTagsController,
  tagDetailController,
} from "../controllers/tag.controllers.js";

const router = Router();

// Routes
router.route("/").get(tagDetailController);
router.route("/all").get(fetchTagsController);
router.route("/create").post(verifyUser, createTagController);

export default router;
