import { Router } from "express";

import { isAuthorized, verifyUser } from "../middlewares/auth.middleware.js";
import {
  createTagController,
  fetchTagsController,
  tagDetailController,
  updateTagController,
} from "../controllers/tag.controllers.js";

const router = Router();

// Routes
router.route("/").get(tagDetailController);
router.route("/").post(verifyUser, createTagController);
router
  .route("/")
  .patch(verifyUser, isAuthorized("Tag", "author"), updateTagController);
router.route("/all").get(fetchTagsController);

export default router;
