import Story from "../models/story.model.js";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import {
  notEmptyArrayValidation,
  notEmptyValidation,
  minLengthValidation,
} from "../utils/validators.js";

// Get All Stories Controller
export const fetchStoriesController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get all stories
   * TODO: Sending Response
   * **/

  // * Fetch all stories
  const stories = await Story.find({});

  // * Sending Response
  return res
    .status(200)
    .json(new ApiResponse(200, { stories }, "Stories fetched successfully!"));
});

// Create Story Controller
export const createStoryController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get data from frontend
   * TODO: Validate data
   * TODO: Create Story
   * TODO: Sending Response
   * **/

  // * Get data from frontend
  const { title, description, genre } = req.body;
  const author = req.user._id;
  const poster = req.file?.path;

  // * Validate Data
  notEmptyValidation([title, description]);
  notEmptyArrayValidation(genre, "Genre");
  minLengthValidation(title, 3, "Title");
  minLengthValidation(description, 50, "Description");
  if (!poster) throw new ApiError(400, "Please upload an image");

  // * Create Story
  const createdStory = await Story.create({
    title,
    description,
    genre,
    author,
    poster,
  });

  // * Sending Response
  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { story: createdStory },
        "Story created successfully!"
      )
    );
});
