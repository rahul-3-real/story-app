import mongoose from "mongoose";

const GenreSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const Genre = mongoose.model("Genre", GenreSchema);

export default Genre;
