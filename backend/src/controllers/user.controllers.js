import jwt from "jsonwebtoken";

import User from "../models/user.model.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import {
  compareFieldValidation,
  emailValidation,
  minLengthValidation,
  notEmptyValidation,
  passwordValidation,
} from "../utils/validators.js";
import {
  options,
  generateAccessRefreshToken,
  generate20CharToken,
  generatePasswordResetToken,
  generateVerifyEmailToken,
} from "../utils/generateToken.js";
import {
  accountCreatedEmail,
  sendPasswordResetEmail,
  verifyEmail,
} from "../configs/email.config.js";

// Register Controller
export const registerController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get data from Frontend
   * TODO: Validate data
   * TODO: Check if user exists
   * TODO: Create User
   * TODO: Check if user is created
   * TODO: Generate Access & Refresh Token
   * TODO: Send Emails
   * TODO: Send Response
   * **/

  // * Get data from Frontend
  const { full_name, email, password, password2 } = req.body;

  // * Validate data
  notEmptyValidation([full_name, email, password, password2]);
  minLengthValidation(full_name, 3, "Full Name");
  emailValidation(email);
  passwordValidation(password);
  compareFieldValidation(password, password2, "Password does not match");

  // * Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new ApiError(409, "Email already exists");

  // * Create User
  const createdUser = await User.create({ full_name, email, password });

  // * Check if user is created
  const user = await User.findById(createdUser._id);
  if (!user) throw new ApiError(500, "Error creating user");

  // * Generate Access & Refresh Token
  const { accessToken, refreshToken } = await generateAccessRefreshToken(
    user._id
  );

  // * Send Emails
  const token = generate20CharToken();
  await accountCreatedEmail(user);
  await generateVerifyEmailToken(user._id, token);
  await verifyEmail(user, token);

  // * Send Response
  return res
    .status(201)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        201,
        {
          user,
          accessToken,
          refreshToken,
        },
        "User created successfully!"
      )
    );
});

// Login Controller
export const loginController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get data from Frontend
   * TODO: Validate data
   * TODO: Check if user exists
   * TODO: Check Password
   * TODO: Generate token
   * TODO: Send Response
   * **/

  // * Get data from Frontend
  const { email, password } = req.body;

  // * Validate data
  notEmptyValidation([email, password]);
  emailValidation(email);
  passwordValidation(password);

  // * Check if user exists
  const userExist = await User.findOne({ email }).select("password");
  if (!userExist) throw new ApiError(401, "Invalid email or password");

  // * Check Password
  const isPasswordCorrect = await userExist.checkPassword(password);
  if (!isPasswordCorrect) throw new ApiError(401, "Invalid email or password");

  // * Generate token
  const { accessToken, refreshToken } = await generateAccessRefreshToken(
    userExist._id
  );

  const user = await User.findById(userExist._id);

  // * Send Response
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user,
          accessToken,
          refreshToken,
        },
        "Logged in successfully!"
      )
    );
});

// Logout Controller
export const logoutController = asyncHandler(async (req, res) => {
  /**
   * TODO: Update token in backend
   * TODO: Delete cookie from frontend
   * TODO: Sending Response
   * **/

  // * Update token in backend
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: { refreshToken: undefined },
    },
    { new: true }
  );

  // * Sending Response & Delete cookie from frontend
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out!"));
});

// Refresh Access Token Controller
export const refreshAccessTokenController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get Refresh token from cookie
   * TODO: Decode Refresh Token
   * TODO: Check if user exists
   * TODO: Compare cookie refresh token with refresh token stored in database
   * TODO: Generate new access token
   * TODO: Sending Response
   * **/

  // * Get Refresh token from cookie
  const incomingRefreshToken =
    req.cookies?.refreshToken || req.body?.refreshToken;

  if (!incomingRefreshToken) throw new ApiError(400, "Unauthorized Request");

  try {
    // * Decode refresh token
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    // * Check if user exists
    const user = await User.findById(decodedToken?._id).select("refreshToken");
    if (!user) throw new ApiError(400, "Invalid refresh token");

    // * Compare cookie refresh token with refresh token stored in database
    if (incomingRefreshToken !== user?.refreshToken) {
      res.status(401).json({ message: "Refresh token is expired!" });
    }

    // * Generate new access token
    const { accessToken, refreshToken } = await generateAccessRefreshToken(
      user._id
    );

    // * Sending Response
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            accessToken,
            refreshToken,
          },
          "Access token refreshed!"
        )
      );
  } catch (error) {
    throw new ApiError(400, error.message || "Invalid refresh token");
  }
});

// Get User Profile Controller
export const getUserProfileController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get User from request
   * TODO: Send Response
   * **/

  // * Get User from request
  const requestUser = req.user;
  const user = await User.findById(requestUser._id);

  // * Send Response
  return res
    .status(200)
    .json(new ApiResponse(200, user, "Fetched user profile successfully!"));
});

// Forgot Password Controller
export const forgotPasswordController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get email from frontend
   * TODO: Validate data
   * TODO: Check if user exists
   * TODO: Sending Email with password reset token
   * TODO: Sending Response
   * **/

  // * Get email from frontend
  const { email } = req.body;

  // * Validate data
  notEmptyValidation([email]);
  emailValidation(email);

  // * Check if user exists
  const user = await User.findOne({ email });
  if (!user) throw new ApiError(400, "User does not exist");

  // * Sending Email with password reset token
  const token = generate20CharToken();
  await generatePasswordResetToken(user._id, token);
  await sendPasswordResetEmail(user.email, token);

  // * Sending Response
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password reset link sent to your email"));
});
