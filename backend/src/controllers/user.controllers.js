import jwt from "jsonwebtoken";

import User from "../models/user.model.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import {
  compareFieldValidation,
  emailValidation,
  minimumAgeValidation,
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
  //   await accountCreatedEmail(user);
  await generateVerifyEmailToken(user._id, token);
  //   await verifyEmail(user, token);

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
  //   await sendPasswordResetEmail(user.email, token);

  // * Sending Response
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password reset link sent to your email"));
});

// Forgot Password Request Controller
export const forgotPasswordRequestController = asyncHandler(
  async (req, res) => {
    /**
     * TODO: Get token from URL
     * TODO: Check if token is valid
     * TODO: Get data from Frontend
     * TODO: Validate data
     * TODO: Update new password
     * TODO: Sending Response
     * **/

    // * Get token from URL
    const { token } = req.query;

    // * Check if token is valid
    const user = await User.findOne({ passwordResetToken: token });
    if (!user) {
      throw new ApiError(400, "Invalid token");
    }

    const currentDate = new Date();
    if (currentDate > user.passwordResetTokenExpiry) {
      throw new ApiError(400, "Password reset token has expired");
    }

    // * Get data from Frontend
    const { password, password2 } = req.body;

    // * Validate data
    notEmptyValidation([password, password2]);
    minLengthValidation(password, 6, "Password");
    passwordValidation(password);
    compareFieldValidation(password, password2, "Password does not match");

    // * Update new password
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpiry = undefined;
    await user.save();

    // * Sending Response
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Password updated successfully!"));
  }
);

// Reset Password Controller
export const resetPasswordController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get data from frontend
   * TODO: Validate data
   * TODO: check if old password is correct
   * TODO: Update password to new password
   * TODO: Sending Response
   * **/

  // * Get data from frontend
  const { oldPassword, password, password2 } = req.body;

  // * Validate data
  notEmptyValidation([oldPassword, password, password2]);
  minLengthValidation(password, 6, "Password");
  compareFieldValidation(password, password2, "Password does not match");
  passwordValidation(password);
  if (oldPassword === password) {
    throw new ApiError(400, "New password cannot be same as old password");
  }

  // * Check if old password is correct
  const user = await User.findById(req.user._id).select("password");
  const passwordCheck = await user.checkPassword(oldPassword);
  if (!passwordCheck) throw new ApiError(400, "Old password is incorrect");

  // * Update password to new password
  user.password = password;
  await user.save();

  // * Sending Response
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password updated successfully!"));
});

// Verify Account Controller
export const verifyAccountController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get token from URL
   * TODO: Check if token is valid
   * TODO: Update user's verified status
   * TODO: Sending Response
   * **/

  // * Get token from URL
  const { token } = req.query;

  // * Check if token is valid
  const user = await User.findOne({ verificationToken: token });
  if (!user) throw new ApiError(400, "Invalid token");

  const currentDate = new Date();
  if (currentDate > user.verificationTokenExpiry) {
    throw new ApiError(400, "Verification token has expired");
  }

  // * Update user's verified status
  user.verified = true;
  user.verificationToken = undefined;
  user.verificationTokenExpiry = undefined;
  await user.save();

  // * Sending Response
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Account verified successfully!"));
});

// Verify Account Request Controller
export const verifyAccountRequestController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get email from request user
   * TODO: Check if already verified
   * TODO: Sending Email with verification token
   * TODO: Sending Response
   * **/

  // * Get email from request user
  const user = req.user;

  // * Check if already verified
  if (user.verified) throw new ApiError(400, "Account already verified");

  try {
    // * Sending Email with verification token
    const token = generate20CharToken();
    await generateVerifyEmailToken(user._id, token);
    // await verifyEmail(user.email, token);

    // * Sending Response
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Verification link sent to your email"));
  } catch (error) {
    throw new ApiError(
      500,
      error.message || "Failed to send verification email"
    );
  }
});

// Update Email Controller
export const updateEmailController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get new email from frontend
   * TODO: Validate data
   * TODO: Check if new email is already taken
   * TODO: Update user's email
   * TODO: Sending Response
   * **/

  // * Get new email from frontend
  const { newEmail } = req.body;

  // * Validate data
  notEmptyValidation([newEmail]);
  emailValidation(newEmail);

  // * Check if new email is already taken
  const existingUser = await User.findOne({ email: newEmail });
  if (existingUser) throw new ApiError(400, "Email is already taken");

  try {
    // * Update user's email
    const user = req.user;
    user.email = newEmail;
    user.verified = false;
    await user.save();

    // * Send Verification email
    const token = generate20CharToken();
    await generateVerifyEmailToken(user._id, token);
    // await verifyEmail(user.email, token);

    // * Sending Response
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          {},
          "Email updated successfully! Verification link sent to your new email."
        )
      );
  } catch (error) {
    throw new ApiError(
      500,
      error.message || "Failed to send verification email"
    );
  }
});

// Update Profile Controller
export const updateProfileController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get updated profile data from frontend
   * TODO: Validate data
   * TODO: Update user's profile
   * TODO: Sending Response
   * **/

  // * Get updated profile data from frontend
  const { full_name, date_of_birth, gender } = req.body;

  try {
    // * Find the user by ID
    const user = await User.findById(req.user._id);

    // * Check if is date_of_birth changed
    if (date_of_birth) {
      minimumAgeValidation(date_of_birth, 5);
    }
    if (full_name) minLengthValidation(full_name, 3, "Full Name");

    // * Update user's profile if data is provided, otherwise keep the existing details
    user.full_name = full_name || user.full_name;
    user.date_of_birth = date_of_birth || user.date_of_birth;
    user.gender = gender || user.gender;

    // * Save the updated user profile
    await user.save();

    // * Updated User
    const updatedUser = await User.findById(user._id);

    // * Sending Response
    return res
      .status(200)
      .json(new ApiResponse(200, updatedUser, "User updated successfully!"));
  } catch (error) {
    throw new ApiError(500, error.message || "Failed to update user profile");
  }
});

// Update User Avatar Controller
export const updateAvatarController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get File from frontend
   * TODO: Upload File
   * TODO: Sending Response
   * **/

  // * Get File from frontend
  const avatar = req.file?.path;
  if (!avatar) throw new ApiError(400, "Please upload an image");

  // * Upload file
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    { $set: { avatar } },
    { new: true }
  );

  // * Sending Response
  return res
    .status(200)
    .json(new ApiResponse(200, user, "Avatar image uploaded successfully!"));
});

// Remove User Avatar Controller
export const removeAvatarController = asyncHandler(async (req, res) => {
  /**
   * TODO: Get User from request and remove avatar
   * TODO: Sending Response
   * **/

  // * Get User from request and remove avatar
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    { $unset: { avatar: "" } },
    { new: true }
  );

  // * Sending Response
  return res
    .status(200)
    .json(new ApiResponse(200, user, "Avatar removed successfully!"));
});
