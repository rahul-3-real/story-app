import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
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
  notEmptyValidation(res, [email, username, password, fullname]);
  usernameValidation(res, username);
  emailValidation(res, email);
  passwordValidation(res, password);

  //* Checking if User exists
  // const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  // if (existingUser) {
  //   res
  //     .status(409)
  //     .json({ message: "User with email or username already exists" });
  // }
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    res.status(409).json({ message: "Email already taken!" });
  }
  const usernameExists = await User.findOne({ username });
  if (usernameExists) {
    res.status(409).json({ message: "username already taken!" });
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
    res.json(500).json({ message: "Error creating user, Please try again!" });
  }

  //* Sending RESPONSE
  res.status(201).json({ user, message: "User registered!" });
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
    res.status(400).json({ message: "Usermail/Email is required" });
  }
  email && emailValidation(res, email);
  username && usernameValidation(res, username);
  if (!password) {
    res.status(400).json({ message: "Password is required" });
  }

  //* Finding User
  const user = await User.findOne({ $or: [{ email }, { username }] });
  if (!user) {
    res.status(400).json({ message: "User not found, try signing up!" });
  }

  //* Checking Password
  const passwordCheck = await user.isPasswordCorrect(password);
  if (!passwordCheck) {
    res.status(401).json({ message: "Wrong credentials!" });
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
    .json({
      user: loggedInUser,
      accessToken,
      refreshToken,
      message: "User loggedin successfully!",
    });
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
    .json({ message: "User logged out" });
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
    res.status(401).json({ message: "Unauthorized request!" });
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
      res.status(401).json({ message: "Invalid refresh token!" });
    }

    //* Comparing cookie refresh token with user refresh token
    if (incomingRefreshToken !== user?.refreshToken) {
      res.status(401).json({ message: "Refres token is expired!" });
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
      .json({ accessToken, refreshToken, message: "Access token refreshed!" });
  } catch (error) {
    res
      .status(401)
      .json({ message: error?.message || "Invalid refresh token!" });
  }
});

// Change Password
export const changePassword = asyncHandler(async (req, res) => {
  /**
   * TODO: Getting details from frontend
   * TODO: Getting user from cookie
   * TODO: Compating old password with the user password
   * TODO: If true, set new password as user password
   * TODO: response
   * **/

  //* Getting data from user
  const { oldPassword, newPassword } = req.body;

  //* Getting user from cookie
  const user = await User.findById(req.user?.id);

  //* Validating
  notEmptyValidation(res, [oldPassword, newPassword]);
  passwordValidation(res, newPassword);
  const passwordCheck = await user.isPasswordCorrect(oldPassword);
  if (!passwordCheck) {
    res.status(400).json({ message: "Invalid old password!" });
  }
  if (oldPassword === newPassword) {
    res.status(400).json({
      message:
        "New password is the same as the old password, try a different one!",
    });
  }

  //* Setting new password
  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  //* Response
  res.status(200).json({ message: "Password changed successfully" });
});

// Get Current User
export const getCurrentUser = asyncHandler(async (req, res) => {
  res.status(200).json({ user: req?.user, message: "Fetched current user!" });
});

// Updating User Profile
export const updateUserProfile = asyncHandler(async (req, res) => {
  /**
   * TODO: Getting details from frontend
   * TODO: Validating details
   * TODO: Updating user
   * **/

  //* Getting details
  const { username, email, fullname, gender, dateOfBirth, location } = req.body;

  //* Validating user
  notEmptyValidation(res, [email, username, fullname]);
  usernameValidation(res, username);
  emailValidation(res, email);

  //* Checking if username or email already exist
  const existingUser = await User.findOne({
    $and: [{ _id: { $ne: req.user?._id } }, { $or: [{ email }, { username }] }],
  });

  if (existingUser) {
    res.status(409).json({ message: "Email or username is already in use" });
  }

  //* Updating user
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    { $set: { username, email, fullname, gender, dateOfBirth, location } },
    { new: true }
  ).select("-password -refreshToken");

  //* Response
  res
    .status(200)
    .json({ user, message: "Account details updated successfully" });
});

// Update Avatar Image
export const updateAvatarImage = asyncHandler(async (req, res) => {
  /**
   * TODO: Getting file from frontend
   * TODO: Updating file
   * **/

  //* Getting file
  let localPath;
  if (!req.file) {
    localPath = "";
  }
  localPath = req.file?.path;

  //* Updating file
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    { $set: { avatar: localPath } },
    { new: true }
  ).select("-password -refreshToken");

  res.status(200).json({ user, message: "Avatar updated!" });
});
