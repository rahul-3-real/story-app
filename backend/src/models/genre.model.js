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
  },
  { timestamps: true }
);

const Genre = mongoose.model("Genre", GenreSchema);

export default Genre;
