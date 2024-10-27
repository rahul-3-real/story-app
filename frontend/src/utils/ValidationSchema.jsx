import * as yup from "yup";

const passwordRules =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@._\-!$])[a-zA-Z0-9@._\-!$]{6,}$/;
// Minimum 6, 1 uppercase, 1 lowercase, 1 numeric digit

// Register Schema Validation
export const registerSchema = yup.object().shape({
  full_name: yup.string().required("This field is required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("This field is required"),
  password: yup
    .string()
    .min(6)
    .matches(passwordRules, {
      message:
        "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 special character (@ . _ - ! $), and must be at least 6 characters long",
    })
    .required("This field is required"),
  password2: yup
    .string()
    .required("This field is required")
    .oneOf([yup.ref("password"), null, "Password must match"]),
});

// Login Schema Validation
export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("This field is required"),
  password: yup
    .string()
    .min(6)
    .matches(passwordRules, { message: "Please enter a valid password" })
    .required("This field is required"),
});

// Email Schema Validation
export const emailSchema = yup.object().shape({
  newEmail: yup
    .string()
    .email("Please enter a valid email")
    .required("This field is required"),
});
