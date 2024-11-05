import mongoose from "mongoose";

// Chapter Schema
const ChapterSchema = new mongoose.Schema(
  {
    story: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Story",
      required: true,
    },
    chapter_no: {
      type: Number,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
      maxlenght: 250,
    },
    content: {
      type: String,
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

const Chapter = mongoose.model("Chapter", ChapterSchema);

export default Chapter;
