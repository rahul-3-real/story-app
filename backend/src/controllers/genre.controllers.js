import Genre from "../models/genre.model.js";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";

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
