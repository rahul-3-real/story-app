import User from "../models/user.model.js";
import ApiError from "./apiError.js";

export const generateAccessAndRefresToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong while generating tokens" });
  }
};

export const options = {
  httpOnly: true,
  secure: true,
};
