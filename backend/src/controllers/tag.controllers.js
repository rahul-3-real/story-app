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

  // * Validate data
  notEmptyValidation([title, description]);
  minLengthValidation(title, 3, "Title");
  maxLengthValidation(title, 100, "Title");
  minLengthValidation(description, 50, "Description");
  maxLengthValidation(description, 250, "Description");

  const tagExist = await Tag.findOne({ title });
  if (tagExist) throw new ApiError(400, "Tag already exists");

  // * Create Tag
  const tag = await Tag.create({ title, description });

  // * Sending Response
  return res
    .status(201)
    .json(new ApiResponse(201, tag, "Tag created successfully!"));
});
