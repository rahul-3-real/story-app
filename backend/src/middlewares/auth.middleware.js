import jwt from "jsonwebtoken";

import User from "../models/user.model.js";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import getModelByName from "../utils/getModelByName.js";

// Verify that the user is authenticated
export const verifyUser = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) throw new ApiError(201, "Unauthorized request");

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id);

    if (!user) throw new ApiError(401, "Invalid access token");

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});

// Check if the user is Authorized
export const isAuthorized = (modelName, identifier) =>
  asyncHandler(async (req, res, next) => {
    try {
      const user = req.user;

      // Extract the resource ID from request params or query
      const resourceId = req.params.id || req.query._id;
      if (!resourceId) throw new ApiError(400, "Resource ID not provided.");

      // Dynamically select the appropriate model based on modelName
      const ResourceModel = getModelByName(modelName);
      if (!ResourceModel)
        throw new ApiError(400, `Model ${modelName} not found.`);

      // Fetch the resource from the database
      const resource = await ResourceModel.findById(resourceId);
      if (!resource) throw new ApiError(404, "Resource not found.");

      // Check if the requesting user is the owner of the resource based on identifier
      if (resource[identifier].toString() !== user._id.toString()) {
        throw new ApiError(
          403,
          "You are not authorized to perform this action."
        );
      }

      next();
    } catch (error) {
      next(new ApiError(403, error?.message || "Unauthorized access"));
    }
  });

// Check If the user is Verified
export const isVerified = asyncHandler(async (req, res, next) => {
  try {
    const user = req.user;

    if (!user.verified) throw new ApiError(403, "Account is not verified.");

    next();
  } catch (error) {
    next(new ApiError(403, error?.message || "Unauthorized access"));
  }
});

// Check Is Admin
export const isAdmin = asyncHandler(async (req, res, next) => {
  try {
    const user = req.user;

    if (!user.is_admin) throw new ApiError(403, "Unauthorized access");

    next();
  } catch (error) {
    next(new ApiError(403, error?.message || "Unauthorized access"));
  }
});

// Check Is Author
export const isAuthor = asyncHandler(async (req, res, next) => {
  try {
    const user = req.user;

    if (!user.is_author) throw new ApiError(403, "Unauthorized access");

    next();
  } catch (error) {
    next(new ApiError(403, error?.message || "Unauthorized access"));
  }
});
