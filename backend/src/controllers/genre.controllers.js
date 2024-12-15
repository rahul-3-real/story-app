import Genre from "../models/genre.model.js";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import {
  notEmptyValidation,
  minLengthValidation,
} from "../utils/validators.js";

// Get All Genres Controller
export const fetchGenresController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get all genres
   * TODO: Sending Response
   * **/

  // * Fetch all genres
  const genres = await Genre.find({});

  // * Sending Response
  return res
    .status(200)
    .json(new ApiResponse(200, { genres }, "Genres fetched successfully!"));
});

// Create Genre Controller
export const createGenreController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get data from Frontend
   * TODO: Validate data
   * TODO: Create Genre
   * TODO: Sending Response
   * **/

  // * Get data from Frontend
  const { title, description } = req.body;

  // * Validate data
  notEmptyValidation([title, description]);
  minLengthValidation(title, 3, "Title");
  minLengthValidation(description, 50, "Description");

  // * Check if data exist
  const genreExist = await Genre.findOne({ title });
  if (genreExist) throw new ApiError(400, "Genre already exists");

  // * Create Genre
  const createdGenre = await Genre.create({ title, description });

  // * Sending Response
  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { genre: createdGenre },
        "Genre created successfully!"
      )
    );
});

// Get Genre Detail Controller
export const genreDetailController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get genre id from request
   * TODO: Search genre
   * TODO: Sending Response
   * **/

  // * Get genre id from request
  const { _id } = req.query;

  // * Search genre
  const genre = await Genre.findById(_id);
  if (!genre) throw new ApiError(404, "Genre not found");

  // * Sending Response
  return res
    .status(200)
    .json(new ApiResponse(200, { genre }, "Genre fetched successfully!"));
});

// Update Genre Controller
export const updateGenreController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get data from request
   * TODO: Check if genre exists
   * TODO: Validate data
   * TODO: Update data
   * TODO: Sending Response
   * **/

  // * Get data from request
  const { title, description } = req.body;
  const { _id } = req.query;

  // * Check if genre exists
  const genre = await Genre.findById(_id);
  if (!genre) throw new ApiError(404, "Genre not found");

  // * Validate data
  if (title) {
    minLengthValidation(title, 3, "Title");

    // Check for existing tag with the same title
    const genreExists = await Genre.findOne({ title, _id: { $ne: _id } });
    if (genreExists)
      throw new ApiError(400, "Genre with this title already exists");
  }

  if (description) minLengthValidation(description, 50, "Description");

  // * Update genre
  genre.title = title || genre.title;
  genre.description = description || genre.description;
  await genre.save();

  // * Sending Response
  return res
    .status(200)
    .json(new ApiResponse(200, { genre }, "Genre updated successfully!"));
});

// Delete Genre Controller
export const deleteGenreController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get genre id from request
   * TODO: Check if genre exists
   * TODO: Delete genre
   * TODO: Sending Response
   * **/

  // * Get genre id from request
  const { _id } = req.query;

  // * Check if genre exists
  const genre = await Genre.findByIdAndDelete(_id);
  if (!genre) throw new ApiError(404, "Genre not found");

  // * Sending Response
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Genre deleted successfully!"));
});
