import User from "../models/user.model.js";
import ApiError from "./apiError.js";

// Options for token cookies
export const options = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};

// Generate access and refresh token
export const generateAccessRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new ApiError(404, "User not found.");

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      `Something went wrong while generating token: ${error.message}`
    );
  }
};

// Generating 20 Characters Token
export const generate20CharToken = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";

  for (let i = 0; i < 20; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }

  return code;
};

// Generate Password Reset Token
export const generatePasswordResetToken = async (userId, token) => {
  try {
    const user = await User.findById(userId);
    user.passwordResetToken = token;
    user.passwordResetTokenExpiry = new Date(+new Date() + 24 * 60 * 60 * 1000);
    await user.save({ validateBeforeSave: true });
  } catch (error) {
    throw new ApiError(
      500,
      `Something went wrong while generating token :: ${error}`
    );
  }
};

// Generate Verify Email Token
export const generateVerifyEmailToken = async (userId, token) => {
  try {
    const user = await User.findById(userId);
    user.verificationToken = token;
    user.verificationTokenExpiry = new Date(+new Date() + 24 * 60 * 60 * 1000);
    await user.save({ validateBeforeSave: true });
  } catch (error) {
    throw new ApiError(
      500,
      `Something went wrong while generating token :: ${error}`
    );
  }
};
