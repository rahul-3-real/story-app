import * as yup from "yup";

// Password Rule - Minimum 6, 1 uppercase, 1 lowercase, 1 numeric digit
const passwordRules =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@._\-!$])[a-zA-Z0-9@._\-!$]{6,}$/;

// Email Rule
const emailRules = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Define username validation regex
const usernameRules = /^[a-z0-9._-]{4,20}$/;

// Register Schema Validation
export const registerSchema = yup.object().shape({
  full_name: yup.string().required("This field is required"),
  username: yup
    .string()
    .matches(
      usernameRules,
      "Username must be 4-20 characters and contain only lowercase letters, numbers, or . _ -"
    )
    .required("This field is required"),
  email: yup
    .string()
    .matches(emailRules, "Please enter a valid email")
    .required("This field is required"),
  password: yup
    .string()
    .min(
      6,
      "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 special character (@ . _ - ! $), and must be at least 6 characters long"
    )
    .matches(passwordRules, {
      message:
        "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 special character (@ . _ - ! $), and must be at least 6 characters long",
    })
    .required("This field is required"),
  password2: yup
    .string()
    .required("This field is required")
    .oneOf([yup.ref("password")], "Password must match"),
});

// Login Schema Validation
export const loginSchema = yup.object().shape({
  identifier: yup
    .string()
    .min(4, "Email / Username should be atleast 4 characters long")
    .required("This field is required"),
  password: yup
    .string()
    .min(
      6,
      "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 special character (@ . _ - ! $), and must be at least 6 characters long"
    )
    .matches(passwordRules, {
      message:
        "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 special character (@ . _ - ! $), and must be at least 6 characters long",
    }),
});

// Forgot Password Email Schema Validation
export const forgotPasswordEmailSchema = yup.object().shape({
  email: yup
    .string()
    .matches(emailRules, "Please enter a valid email")
    .required("This field is required"),
});

// Forgot Password Reset Schema Validation
export const forgotPasswordResetSchema = yup.object().shape({
  password: yup
    .string()
    .min(
      6,
      "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 special character (@ . _ - ! $), and must be at least 6 characters long"
    )
    .matches(passwordRules, {
      message:
        "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 special character (@ . _ - ! $), and must be at least 6 characters long",
    })
    .required("This field is required"),
  password2: yup
    .string()
    .required("This field is required")
    .oneOf([yup.ref("password")], "Password must match"),
});

// Email Schema Validation
export const emailSchema = yup.object().shape({
  newEmail: yup
    .string()
    .matches(emailRules, "Please enter a valid email")
    .required("This field is required"),
});

// Profile Schema Validation
export const profileSchema = yup.object().shape({
  full_name: yup.string().required("Full name is required"),
  date_of_birth: yup
    .date()
    .max(new Date(), "Date of birth cannot be in the future")
    .nullable(true),
  gender: yup
    .string()
    .oneOf(["Male", "Female", "Other"], "Invalid gender")
    .nullable(true),
});
