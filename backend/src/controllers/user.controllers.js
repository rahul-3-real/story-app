import User from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { generateAccessAndRefreshToken } from "../utils/generateToken.js";
import { options } from "../utils/options.js";

// Register Controller
export const registerController = async (req, res) => {
  const { email, username, fullname, password } = req.body;

  try {
    // Checking if username and email exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      throw new ApiError(400, "User with this email/username already exists");
    }

    // Validating username
    const usernameRegex = /^[a-zA-Z0-9]+([_\-.][a-zA-Z0-9]+)*$/;
    if (!usernameRegex.test(username)) {
      throw new ApiError(
        400,
        "Username should only contain alphabets, numbers and (_ - .)"
      );
    }

    // Checking Password Length
    if (password.length < 6) {
      throw new ApiError(400, "Password length must be at least 6 characters");
    }

    // Creating User
    const user = await User.create({ username, email, password, fullname });

    // Checking if user exists in Database or not
    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );
    if (!createdUser) {
      throw new ApiError(400, "Error regestring user, Please try again!");
    }

    res
      .status(201)
      .json(new ApiResponse(200, createdUser, "User registered successfully"));
  } catch (error) {
    console.error(error);
    res.status(400).json({
      error: error.message,
    });
  }
};

// Login Controller
// export const loginController = async (req, res) => {
//   const { username, email, password } = req.body;

//   try {
//     // Checking User with email/username already exists
//     const user = await User.findOne({ $or: [{ email }, { username }] });
//     if (!user) {
//       throw new ApiError(404, "Account does not exist, try signing up!");
//     }

//     // Validating Password
//     const validPassword = await user.comparePassword(password);
//     if (!validPassword) {
//       throw new ApiError(404, "Wrong credientials!");
//     }

//     // Generating Access & Refresh Token
//     const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
//       user._id
//     );

//     // Logged In User
//     const loggedInUser = await User.findById(user._id).select(
//       "-password -refreshToken"
//     );

//     res
//       .status(201)
//       .cookie("accessToken", accessToken, options)
//       .cookie("refreshToken", refreshToken, options)
//       .json(
//         new ApiResponse(
//           200,
//           { loggedInUser, accessToken, refreshToken },
//           "You are now logged in!"
//         )
//       );
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ error: error.message });
//   }
// };

// Login Controller
export const loginController = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Checking User with email/username already exists
    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (!user) {
      throw new ApiError(404, "Account does not exist, try signing up!");
    }

    // Validating Password
    const validPassword = await user.comparePassword(password);
    if (!validPassword) {
      throw new ApiError(404, "Wrong credentials!");
    }

    // Generating Access & Refresh Token
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );

    // Check if user._id is truthy before querying the database
    if (user._id) {
      // Logged In User
      const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
      );

      res
        .status(201)
        .json(new ApiResponse(200, { loggedInUser }, "You are now logged in!"));
    } else {
      throw new ApiError(500, "Internal Server Error");
    }
  } catch (error) {
    console.error(error);
    res.status(error.statusCode || 400).json({ error: error.message });
  }
};

// Logout Controller
export const logoutController = async (req, res) => {
  res.status(200).json({
    message: "User logged out!",
  });
};
