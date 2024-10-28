import axios from "axios";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Input } from "../../components/forms";
import { setAuthError } from "../../store/slices/authSlice";
import { forgotPasswordResetSchema } from "../../utils/ValidationSchema";

const ForgotPasswordRequest = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [isTokenValid, setIsTokenValid] = useState(false);

  const queryParams = new URLSearchParams(location.search);
  const paramToken = queryParams.get("token");

  const validateToken = async () => {
    const response = await axios.get(
      `${
        import.meta.env.VITE_API_BASE_URL
      }/user/forgot-password-validate-token?token=${paramToken}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      setIsTokenValid(true);
      return;
    }
    setIsTokenValid(false);
  };

  // Page Title
  useEffect(() => {
    document.title = "Forgot Password Request - Story App";
    validateToken();
  }, []);

  // Submit Form
  const onSubmit = async (values, { setErrors, setSubmitting, resetForm }) => {
    try {
      const response = await axios.patch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/user/forgot-password-request?token=${paramToken}`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        navigate("/login", { replace: true });
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
      password: "",
      password2: "",
    },
    validationSchema: forgotPasswordResetSchema,
    onSubmit,
  });

  return (
    <>
      {!isTokenValid && (
        <div className="auth-content">
          <h1 className="logo mb-[50px]">
            Story <span>World</span>
          </h1>
          <h2 className="heading mb-3">Invalid Token!</h2>
          <p className="mb-10">
            We're sorry, but the password reset token you provided is invalid or
            has expired. <br />
            To proceed, please request a new password reset link. Check your
            email for the instructions to reset your password securely. <br />
            <Link to="/forgot-password">Reset Password</Link>
          </p>

          <p className="mt-3">
            If you continue to experience issues, please contact our support
            team for assistance. <br />
            <Link to={`mailto:${import.meta.env.VITE_API_CONTACT_EMAIL}`}>
              {import.meta.env.VITE_API_CONTACT_EMAIL}
            </Link>
          </p>
        </div>
      )}

      {isTokenValid && (
        <div className="auth-content">
          <h1 className="logo mb-[50px]">
            Story <span>World</span>
          </h1>
          <h2 className="heading mb-3">Update Your Password</h2>
          <p className="mb-10">
            To enhance your account security, please update your password. Make
            sure your new password meets the required criteria to ensure it is
            strong and secure.
          </p>

          <form method="POST" onSubmit={handleSubmit}>
            <Input
              type="password"
              label="Password"
              placeholder="Enter your Password"
              id="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && errors.password}
            />

            <Input
              type="password"
              label="Confirm Password"
              placeholder="Re-Enter your Password"
              id="password2"
              name="password2"
              value={values.password2}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password2 && errors.password2}
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
              {isSubmitting ? "Submitting" : "Update Password"}
            </button>

            <p>
              Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
          </form>
        </div>
      )}
    </>
  );
};

export default ForgotPasswordRequest;
