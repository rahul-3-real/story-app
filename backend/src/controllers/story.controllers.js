import mongoose from "mongoose";
import Genre from "../models/genre.model.js";
import Story from "../models/story.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { notEmptyValidation } from "../utils/validations.js";

// Get all Stories
export const fetchAllStories = asyncHandler(async (req, res) => {
  /**
   * TODO: Fetch all stories
   * **/

  //* Fetch all genrestry {
  try {
    const genres = await Story.find();
    res.status(200).json({ genres, message: "Fetched all stories" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create Story
export const createStory = asyncHandler(async (req, res) => {
  /**
   * TODO: Get details from frontend
   * TODO: Get user from request
   * TODO: Validate fields
   * TODO: Create Story
   * TODO: Send Response
   * **/

  //* Get Details from frontend
  const { title, description, genre } = req.body;

  //* Get user from request
  const reqUser = req?.user;

  //* Validate Fields
  notEmptyValidation(res, [title, description, genre]);

  const genreExist = await Genre.findById(genre);
  if (!genreExist) {
    return res.status(404).json({ error: "Selected genre does not exists!" });
  }

  const storyExist = await Story.exists({
    title,
    user: reqUser._id,
  });
  if (storyExist) {
    return res
      .status(400)
      .json({ error: "Story with this title already exists!" });
  }

  //* Creating Story
  try {
    const story = new Story({
      title,
      description,
      user: reqUser,
      genre: genreExist,
    });
    await story.save();
    return res.status(200).json(story);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error!" });
  }
});

// Update Story
export const updateStory = asyncHandler(async (req, res) => {
  /**
   * TODO: Get details from frontend
   * TODO: Check if you are the right user
   * TODO: Check if story exists
   * TODO: Validate story
   * TODO: Update
   * **/

  try {
    //* Getting details from frontend
    const { storyId } = req.params;
    const { title, description, genre } = req.body;
    const reqUser = req?.user;

    const storyExist = await Story.findOne({ _id: storyId });
    if (!storyExist || storyExist.user.toString() !== reqUser._id.toString()) {
      return res.status(401).json({ error: "Unauthorized request" });
    }

    //* Check if the user has already created a story with the same title
    const existingStory = await Story.findOne({
      _id: { $ne: storyId }, // Exclude the current story being updated
      user: reqUser._id,
      title: title,
    });

    if (existingStory) {
      return res
        .status(400)
        .json({ error: "You already have a story with the same title." });
    }

    //* Validation
    notEmptyValidation(res, [title, description, genre]);
    const genreExist = await Genre.findById(genre);
    if (!genreExist) {
      return res.status(404).json({ error: "Selected genre does not exist!" });
    }

    // Update the story
    const updatedStory = await Story.findByIdAndUpdate(
      storyId,
      { $set: { title, description, genre } },
      { new: true }
    );
    return res.status(200).json({ story: updatedStory });
  } catch (error) {
    return res.status(400).json({ error: "Error updating story!" });
  }
});

// Update Story
export const deleteStory = asyncHandler(async (req, res) => {
  /**
   * TODO: Get details from frontend
   * TODO: Check if you are the right user
   * TODO: Check if story exists
   * TODO: Delete
   * **/

  try {
    //* Getting details from frontend
    const { storyId } = req.params;
    const reqUser = req?.user;

    const storyExist = await Story.findOne({ _id: storyId });
    if (!storyExist || storyExist.user.toString() !== reqUser._id.toString()) {
      return res.status(401).json({ error: "Unauthorized request" });
    }

    // Delete the story
    const updatedStory = await Story.findByIdAndDelete(storyId);
    return res.status(200).json({ message: "Story Deleted" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Error deleting story!" });
  }
});

// Get Story of a user
export const fetchStoriesOfUser = asyncHandler(async (req, res) => {
  /**
   * TODO: Get details from frontend
   * TODO: Fetch Stories
   * **/

  try {
    const { userId } = req.params;
    const userStories = await Story.find({ user: userId });
    res.status(200).json({ stories: userStories });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get Story of a user
export const fetchSingleStory = asyncHandler(async (req, res) => {
  /**
   * TODO: Get details from frontend
   * TODO: Fetch Stories
   * **/

  try {
    const { storyId } = req.params;
    const story = await Story.findOne({ _id: storyId });
    console.log(story);
    res.status(200).json({ story });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
