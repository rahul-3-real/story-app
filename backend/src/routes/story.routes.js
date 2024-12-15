import { Router } from "express";

import {
  createStoryController,
  fetchStoriesController,
} from "../controllers/story.controllers.js";
import { isAuthor, verifyUser } from "../middlewares/auth.middleware.js";
import uploadMiddleware from "../middlewares/multer.middleware.js";

const router = new Router();

// Routes
router.route("/all").get(fetchStoriesController);
router
  .route("/")
  .post(
    verifyUser,
    isAuthor,
    uploadMiddleware("poster", ["jpg", "jpeg", "png", "gif", "svg"]),
    createStoryController
  );

export default router;
