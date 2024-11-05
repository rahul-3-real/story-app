import mongoose from "mongoose";

// Tag Schema
const TagSchema = new mongoose.Schema(
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

const Tag = mongoose.model("Tag", TagSchema);

export default Tag;
