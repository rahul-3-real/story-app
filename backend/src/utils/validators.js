import ApiError from "./apiError.js";

// Email Validation
export const emailValidation = (email) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if (!emailRegex.test(email)) {
    throw new ApiError(400, "Please enter a valid email!");
  }

  return email;
};

// Password Validation
export const passwordValidation = (password) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@._\-!$])[a-zA-Z0-9@._\-!$]{6,}$/;

  if (!passwordRegex.test(password)) {
    throw new ApiError(
      400,
      "Password must be at least 6 characters long, contain at least one uppercase letter, one lowercase letter, one special character (@ . _ - ! $), and only contain letters (a-z, A-Z), numbers (0-9), and special characters."
    );
  }

  return password;
};

// Not Empty Validation
export const notEmptyValidation = (fields) => {
  if (fields.some((field) => field?.trim() === "")) {
    throw new ApiError(400, "fields with * are required");
  }

  return fields;
};

// Array Not Empty Validation
export const notEmptyArrayValidation = (field, fieldName) => {
  if (typeof field === "string") {
    field = [field];
  }

  if (!Array.isArray(field) || field.length === 0) {
    throw new ApiError(400, `${fieldName} is required`);
  }

  if (
    field.some(
      (item) => !item || typeof item !== "string" || item.trim() === ""
    )
  ) {
    throw new ApiError(400, `${fieldName} contains invalid or empty values`);
  }

  return field;
};

// Minimum Length Validation
export const minLengthValidation = (input, length, fieldName = "Input") => {
  if (input.length < length) {
    throw new ApiError(
      400,
      `${fieldName} length must be minimum ${length} characters`
    );
  }

  return length;
};

// Compare Field Validation
export const compareFieldValidation = (
  input1,
  input2,
  errMsg = "Inputs does not match"
) => {
  if (input1 !== input2) {
    throw new ApiError(400, errMsg);
  }

  return true;
};

// Minimum age Validation
export const minimumAgeValidation = (date_of_birth, minAge) => {
  const today = new Date();
  const birthDate = new Date(date_of_birth);
  const age = today.getFullYear() - birthDate.getFullYear();

  if (age < minAge) {
    throw new ApiError(400, `User must be at least ${minAge} years old.`);
  }
};
