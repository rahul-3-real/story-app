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

// Get Story Detail Controller
export const storyDetailController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get Story id from request
   * TODO: Search Story
   * TODO: Sending Response
   * **/

  // * Get Story id from request
  const { _id } = req.query;

  // * Search Story
  const story = await Story.findById(_id);
  if (!story) throw new ApiError(404, "Story not found");

  // * Sending Response
  return res
    .status(200)
    .json(new ApiResponse(200, { story }, "Story fetched successfully!"));
});

// Update Story Controller
export const updateStoryController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get data from frontend
   * TODO: Check if story exists
   * TODO: Validate Story
   * TODO: Update Story
   * TODO: Sending Response
   * **/

  // * Get data from frontend
  const { title, description, genre } = req.body;
  const { _id } = req.query;
  const poster = req.file?.path;

  // * Check if story exists
  const story = await Story.findById(_id);
  if (!story) throw new ApiError(404, "Story not found");

  // * Validate Story
  if (title) {
    minLengthValidation(title, 3, "Title");

    // Check for existing story with the same title
    const storyExists = await Story.findOne({ title, _id: { $ne: _id } });
    if (storyExists)
      throw new ApiError(400, "Story with this title already exists");
  }
  if (description) minLengthValidation(description, 50, "Description");
  if (genre) notEmptyArrayValidation(genre, "Genre");

  // * Update Story
  story.title = title || story.title;
  story.description = description || story.description;
  story.genre = genre || story.genre;
  story.poster = poster || story.poster;
  await story.save();

  // * Sending Response
  return res
    .status(200)
    .json(new ApiResponse(200, { story }, "Story updated successfully!"));
});

// Delete Story Controller
export const deleteStoryController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get Story id from request
   * TODO: Check if story exists
   * TODO: Delete Story
   * TODO: Sending Response
   * **/

  // * Get Story id from request
  const { _id } = req.query;

  // * Check if story exists
  const story = await Story.findByIdAndDelete(_id);
  if (!story) throw new ApiError(404, "Story not found");

  // * Sending Response
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Story deleted successfully!"));
});
