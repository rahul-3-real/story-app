import mongoose from "mongoose";

// Story Schema
const StorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
      maxlenght: 500,
    },
    genre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Genre",
    },
    chapters: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chapter",
      },
    ],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    poster: {
      type: String,
      trim: true,
      match: [/\.(jpe?g|png|gif|svg)$/i, "Please provide a valid image URL"],
    },
  },
  { timestamps: true }
);

const Story = mongoose.model("Story", StorySchema);

export default Story;
