import { Router } from "express";

import {
  isAuthorized,
  isVerified,
  verifyUser,
} from "../middlewares/auth.middleware.js";
import {
  createTagController,
  deleteTagController,
  fetchTagsController,
  tagDetailController,
  updateTagController,
} from "../controllers/tag.controllers.js";

const router = Router();

// Routes
router.route("/").get(tagDetailController);
router.route("/").post(verifyUser, isVerified, createTagController);
router
  .route("/")
  .patch(
    verifyUser,
    isVerified,
    isAuthorized("Tag", "author"),
    updateTagController
  );
router
  .route("/")
  .delete(
    verifyUser,
    isVerified,
    isAuthorized("Tag", "author"),
    deleteTagController
  );
router.route("/all").get(fetchTagsController);

export default router;
