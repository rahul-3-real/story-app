// import ApiError from "./apiError.js";

// Not Empty Validation
export const notEmptyValidation = (type, fields) => {
  if (fields.some((field) => field?.trim() === "")) {
    type.status(400).json({ message: "All fields are required" });
  }
  return fields;
};

// Username Validation
export const usernameValidation = (type, username) => {
  const usernameRegex = /^[a-zA-Z0-9]+([_\-.][a-zA-Z0-9]+)*$/;
  if (!usernameRegex.test(username)) {
    type.status(400).json({
      message: "Username should only contain alphabets, numbers and (_ - .)",
    });
  }
  return username;
};

// Email Validation
export const emailValidation = (type, email) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailRegex.test(email)) {
    type.status(400).json({ message: "Please enter a valid email!" });
  }
  return email;
};

// Password Validation
export const passwordValidation = (type, password) => {
  if (password.length <= 6) {
    type
      .status(400)
      .json({ message: "Password length must be minimum 6 characters" });
  }
  return password;
};
