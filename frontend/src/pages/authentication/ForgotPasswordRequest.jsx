import axios from "axios";
import { useEffect } from "react";
import { useFormik } from "formik";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Input } from "../../components/forms";
import { setAuthError } from "../../store/slices/authSlice";
import { forgotPasswordResetSchema } from "../../utils/ValidationSchema";

const ForgotPasswordRequest = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const paramToken = queryParams.get("token");

  // Page Title
  useEffect(() => {
    document.title = "Forgot Password Request - Story App";
  }, []);

  // Submit Form
  const onSubmit = async (values, { setErrors, setSubmitting, resetForm }) => {
    try {
      const response = await axios.post(
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

      console.log(response);

      resetForm();
      return;
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
    <div className="auth-content">
      <h1 className="logo mb-[50px]">
        Story <span>World</span>
      </h1>
      <h2 className="heading mb-3">Update Your Password</h2>
      <p className="mb-10">
        To enhance your account security, please update your password. Make sure
        your new password meets the required criteria to ensure it is strong and
        secure.
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

        <p className="mb-3">
          Forgot Password? <Link to="/forgot-password">Reset</Link>
        </p>

        <p>
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default ForgotPasswordRequest;
