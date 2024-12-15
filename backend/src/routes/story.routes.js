import { Router } from "express";

import {
  createStoryController,
  deleteStoryController,
  fetchStoriesController,
  storyDetailController,
  updateStoryController,
} from "../controllers/story.controllers.js";
import {
  isAuthor,
  isAuthorized,
  verifyUser,
} from "../middlewares/auth.middleware.js";
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
router.route("/").get(storyDetailController);
router
  .route("/")
  .patch(
    verifyUser,
    isAuthor,
    isAuthorized("Story", "author"),
    uploadMiddleware("poster", ["jpg", "jpeg", "png", "gif", "svg"]),
    updateStoryController
  );
router
  .route("/")
  .delete(
    verifyUser,
    isAuthor,
    isAuthorized("Story", "author"),
    deleteStoryController
  );

export default router;
