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
  generateVerifyEmailToken,
} from "../utils/generateToken.js";
import { accountCreatedEmail, verifyEmail } from "../configs/email.config.js";

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
