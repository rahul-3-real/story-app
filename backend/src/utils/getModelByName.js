import User from "../models/user.model.js";
import Story from "../models/story.model.js";
import Genre from "../models/genre.model.js";
import Chapter from "../models/chapter.model.js";
import Tag from "../models/tag.model.js";

// Get Model by Name
const getModelByName = (modelName) => {
  switch (modelName) {
    case "User":
      return User;
    case "Story":
      return Story;
    case "Genre":
      return Genre;
    case "Chapter":
      return Chapter;
    case "Tag":
      return Tag;
    default:
      return null;
  }
};

export default getModelByName;
