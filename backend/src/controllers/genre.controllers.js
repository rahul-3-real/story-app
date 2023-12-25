import Genre from "../models/genre.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { notEmptyValidation } from "../utils/validations.js";

// Get all Genres
export const fetchAllGenres = asyncHandler(async (req, res) => {
  /**
   * TODO: Fetch all genres
   * **/

  //* Fetch all genrestry {
  try {
    const genres = await Genre.find();
    res.status(200).json({ genres, message: "Fetched all genres" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create Genre
export const createGenre = asyncHandler(async (req, res) => {
  /**
   * TODO: Get detils from frontend
   * TODO: Validate fields
   * TODO: Create Genre
   * TODO: Response
   * **/

  //* Get Details
  const { title, description } = req.body;

  //* Validate Field
  notEmptyValidation(res, [title, description]);
  const titleExists = await Genre.findOne({ title });
  if (titleExists) {
    return res
      .status(409)
      .json({ message: "Genre with this title already exists!" });
  }

  try {
    const genre = new Genre({
      title: req.body.title,
      description: req.body.description,
    });
    await genre.save();
    res.status(201).json(genre);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
