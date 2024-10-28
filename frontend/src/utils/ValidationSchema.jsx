import * as yup from "yup";

// Password Rule - Minimum 6, 1 uppercase, 1 lowercase, 1 numeric digit
const passwordRules =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@._\-!$])[a-zA-Z0-9@._\-!$]{6,}$/;

// Email Rule
const emailRules = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Register Schema Validation
export const registerSchema = yup.object().shape({
  full_name: yup.string().required("This field is required"),
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
    }),
});

// Email Schema Validation
export const emailSchema = yup.object().shape({
  newEmail: yup
    .string()
    .matches(emailRules, "Please enter a valid email")
    .required("This field is required"),
});
