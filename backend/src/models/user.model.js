import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

// User Schema
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 4,
      maxlength: 20,
      match: /^[a-z0-9._-]+$/,
      message:
        "Username must contain only lowercase letters, numbers, and the characters ., _, - and be between 4 and 20 characters long",
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      message: "Please enter a valid email address.",
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      select: false,
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@._\-!$])[a-zA-Z0-9@._\-!$]+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one special character (@ . _ - ! $), and must be at least 6 characters long",
      ],
    },
    full_name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      trim: true,
      match: [/\.(jpe?g|png|gif|svg)$/i, "Please provide a valid image URL"],
    },
    date_of_birth: {
      type: Date,
      validate: {
        validator: function (value) {
          return value < Date.now();
        },
        message: "Date of birth cannot be in the future",
      },
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
    },
    verificationTokenExpiry: {
      type: Date,
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetTokenExpiry: {
      type: Date,
    },
    refreshToken: {
      type: String,
      select: false,
    },
  },
  { timestamps: true }
);

// Password Encryption Hook
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
  next();
});

// Password Check Method
UserSchema.methods.checkPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate Access Token
UserSchema.methods.generateAccessToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  });
  return token;
};

// Generate Refresh Token
UserSchema.methods.generateRefreshToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
  return token;
};

const User = mongoose.model("User", UserSchema);

export default User;
