import axios from "axios";
import { useEffect } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Input } from "../../components/forms";
import { setAuthError } from "../../store/slices/authSlice";
import { forgotPasswordEmailSchema } from "../../utils/ValidationSchema";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Page Title
  useEffect(() => {
    document.title = "Forgot Password - Story App";
  }, []);

  // Submit Form
  const onSubmit = async (values, { setErrors, setSubmitting, resetForm }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/user/forgot-password`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        navigate("/forgot-password-email-sent");
        resetForm();
        return;
      } else {
        const apiError = "An error occurred while making the request";
        setErrors({ apiError });
        dispatch(setAuthError(apiError));
      }
    } catch (error) {
      setSubmitting(false);
      if (error.response) {
        const apiError = error.response.data.message || "An error occurred";
        setErrors({ apiError });
        dispatch(setAuthError(apiError));
      } else if (error.request) {
        const apiError = "No response from server";
        setErrors({ apiError });
        dispatch(setAuthError(apiError));
      } else {
        const apiError = "An error occurred while making the request";
        setErrors({ apiError });
        dispatch(setAuthError(apiError));
      }
    }
  };

  // Formik Form
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordEmailSchema,
    onSubmit,
  });

  return (
    <div className="auth-content">
      <h1 className="logo mb-[50px]">
        Story <span>World</span>
      </h1>
      <h2 className="heading mb-3">Recover Your Password</h2>
      <p className="mb-10">
        Enter your email to recieve instructions to reset your password
        securely.
      </p>

      <form method="POST" onSubmit={handleSubmit}>
        <Input
          type="email"
          label="Email"
          placeholder="Enter your Email Id."
          id="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email && errors.email}
        />

        {errors.apiError && (
          <span className="block text-sm text-error mb-4">
            {errors.apiError}
          </span>
        )}

        <button
          type="submit"
          className="button button-block mb-5"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting" : "Send Password Reset Link"}
        </button>

        <p>
          Don't have an account? <Link to="/login">Sign In</Link>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;
