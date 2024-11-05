import mongoose from "mongoose";

// Genre Schema
const GenreSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
      maxlenght: 250,
    },
    poster: {
      type: String,
      trim: true,
      match: [/\.(jpe?g|png|gif|svg)$/i, "Please provide a valid image URL"],
    },
  },
  { timestamps: true }
);

const Genre = mongoose.model("Genre", GenreSchema);

export default Genre;
