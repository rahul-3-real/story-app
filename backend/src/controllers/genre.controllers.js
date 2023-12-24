import Genre from "../models/genre.model.js";

// Get all genres
export const getAllGenres = async (req, res) => {
  let genres;
  try {
    genres = await Genre.find();
    if (genres.length === 0) {
      return res.status(200).json({ message: "No genre found" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(200).json(genres);
};

// Create Genre
export const createGenre = async (req, res) => {};
