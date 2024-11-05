import Tag from "../models/tag.model.js";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import {
  notEmptyValidation,
  minLengthValidation,
  maxLengthValidation,
} from "../utils/validators.js";

// Get All Tags Controller
export const fetchTagsController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get all tags
   * TODO: Sending Response
   * **/

  // * Fetch all tags
  const tags = await Tag.find({});

  // * Sending Response
  return res
    .status(200)
    .json(new ApiResponse(200, { tags }, "Tags fetched successfully!"));
});

// Create Tag Controller
export const createTagController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get data from request
   * TODO: Validate data
   * TODO: Create tag
   * TODO: Sending Response
   * **/

  // * Get data from request
  const { title, description } = req.body;
  const user = req.user;

  // * Validate data
  notEmptyValidation([title, description]);
  minLengthValidation(title, 3, "Title");
  minLengthValidation(description, 50, "Description");

  const tagExist = await Tag.findOne({ title });
  if (tagExist) throw new ApiError(400, "Tag already exists");

  // * Create Tag
  const tag = await Tag.create({ title, description, author: user._id });

  // * Sending Response
  return res
    .status(201)
    .json(new ApiResponse(201, tag, "Tag created successfully!"));
});

// Get Tag Detail Controller
export const tagDetailController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get tag id from request
   * TODO: Search tag
   * TODO: Sending Response
   * **/

  // * Get tag id from request
  const { _id } = req.query;

  // * Search tag
  const tag = await Tag.findById(_id);
  if (!tag) throw new ApiError(404, "Tag not found");

  // * Sending Response
  return res
    .status(200)
    .json(new ApiResponse(200, tag, "Tag fetched successfully!"));
});

// Update Tag Controller
export const updateTagController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get data from request
   * TODO: Check if tag exists
   * TODO: Validate data
   * TODO: Update data
   * TODO: Send response
   **/

  // * Get data from request
  const { title, description } = req.body;
  const { _id } = req.query;

  // * Check if tag exists
  const tag = await Tag.findById(_id);
  if (!tag) throw new ApiError(404, "Tag not found");

  // * Validate data
  if (title) {
    minLengthValidation(title, 3, "Title");

    // Check for existing tag with the same title
    const tagExists = await Tag.findOne({ title, _id: { $ne: _id } });
    if (tagExists)
      throw new ApiError(400, "Tag with this title already exists");
  }

  if (description) minLengthValidation(description, 50, "Description");

  // * Update data
  tag.title = title || tag.title;
  tag.description = description || tag.description;

  // Save the updated tag
  await tag.save();

  // * Send response
  return res
    .status(200)
    .json(new ApiResponse(200, tag, "Tag updated successfully!"));
});
