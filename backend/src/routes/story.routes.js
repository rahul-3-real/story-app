import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createStory,
  deleteStory,
  fetchAllStories,
  fetchSingleStory,
  fetchStoriesOfUser,
  updateStory,
} from "../controllers/story.controllers.js";

const storyRouter = Router();

storyRouter.get("/", fetchAllStories);
storyRouter.post("/", verifyJWT, createStory);
storyRouter.get("/:storyId", fetchSingleStory);
storyRouter.get("/user/:userId", fetchStoriesOfUser);
storyRouter.patch("/:storyId", verifyJWT, updateStory);
storyRouter.delete("/:storyId", verifyJWT, deleteStory);

export default storyRouter;
