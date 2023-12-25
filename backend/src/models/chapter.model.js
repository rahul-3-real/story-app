import mongoose from "mongoose";

const ChapterSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Chapter = mongoose.model("Chapter", ChapterSchema);

export default Chapter;
