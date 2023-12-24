import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  generateAccessAndRefresToken,
  options,
} from "../utils/generateToken.js";
import {
  usernameValidation,
  emailValidation,
  notEmptyValidation,
  passwordValidation,
} from "../utils/validations.js";

// User Registration
export const userRegistration = asyncHandler(async (req, res) => {
  /**
   * TODO: Getting details from frontend
   * TODO: Validating details
   * TODO: Check if user already exists - username, email
   * TODO: Check for images, avatar needed
   * TODO: Create user
   * TODO: Check if user is created
   * TODO: Sending response (Remove password and refreshToken from response)
   **/

  //* Getting data from user
  const { username, email, password, fullname } = req.body;

  //* Validating details
  notEmptyValidation([email, username, password, fullname]);
  usernameValidation(username);
  emailValidation(email);
  passwordValidation(password);

  //* Checking if User exists
  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  //* Checking for files
  let avatarLocalPath;
  if (req.file || req.file?.path) {
    avatarLocalPath = req.file?.path;
  } else {
    avatarLocalPath = "";
  }

  //* Creating User
  const createdUser = await User.create({
    username: username.toLowerCase(),
    email,
    fullname,
    avatar: avatarLocalPath,
    password,
  });

  //* Check if user is created
  const user = await User.findById(createdUser._id).select(
    "-password -refreshToken"
  );
  if (!user) {
    throw new ApiError(500, "Error creating user, Please try again!");
  }

  //* Sending RESPONSE
  return res.status(201).json(new ApiResponse(200, user, "User registered!"));
});

// Login User
export const userLogin = asyncHandler(async (req, res) => {
  /**
   * TODO: Taking details from frontend
   * TODO: Finding user
   * TODO: Password check
   * TODO: Generating Access & Refresh Token
   * TODO: Send cookie + response
   **/

  //* Getting details from user
  const { email, username, password } = req.body;

  //* Validate Username/Email & Password
  if (!email && !username) {
    throw new ApiError(400, "Usermail/Email is required");
  }
  email && emailValidation(email);
  username && usernameValidation(username);
  if (!password) {
    throw new ApiError(400, "Password is required");
  }

  //* Finding User
  const user = await User.findOne({ $or: [{ email }, { username }] });
  if (!user) {
    throw new ApiError(400, "User not found, try signing up!");
  }

  //* Checking Password
  const passwordCheck = await user.isPasswordCorrect(password);
  if (!passwordCheck) {
    throw new ApiError(401, "Wrong credientials!");
  }

  //* Generate Token
  const { accessToken, refreshToken } = await generateAccessAndRefresToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  //* Returning response & cookies
  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User loggedin successfully!"
      )
    );
});

// Logout User
export const userLogout = asyncHandler(async (req, res) => {
  /**
   * TODO: Clearing cookies
   * TODO: Clearing refresh token from database
   **/

  //* verifyJWT middleware is set, which finds user, sets refreshToken in DB as undefined
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: { refreshToken: undefined },
    },
    { new: true }
  );

  //* RESPONSE
  res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out"));
});

// Generating Refresh Access Token
export const refreshAccessToken = asyncHandler(async (req, res) => {
  /**
   * TODO: Getting refresh token from cookie
   * TODO: Decode refresh token data
   * TODO: Check if user exists with that token
   * TODO: Comparing cookie refresh token with user refresh token stored in DB
   * TODO: If True, Generating new access token
   * TODO: Sending response with new access token in cookie
   * **/

  //* Gettig refresh token
  const incomingRefreshToken =
    req.cookies?.refreshToken || req.body?.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request!");
  }

  try {
    //* Decoding refresh token
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    //* Getting user by refresh token
    const user = await User.findById(decodedToken?._id);
    if (!user) {
      throw new ApiError(401, "Invalid refresh token!");
    }

    //* Comparing cookie refresh token with user refresh token
    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refres token is expired!");
    }

    //* Generating new Access token
    const { accessToken, refreshToken } = await generateAccessAndRefresToken(
      user._id
    );

    //* Response
    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken },
          "Access token refreshed!"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token!");
  }
});
