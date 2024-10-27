import axios from "axios";
import { useEffect } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Input } from "../../components/forms";
import { login, setAuthError } from "../../store/slices/authSlice";
import { loginSchema } from "../../utils/ValidationSchema";

const Login = () => {
  const dispatch = useDispatch();

  // Page Title
  useEffect(() => {
    document.title = "Login - Story App";
  }, []);

  // Submit Form
  const onSubmit = async (values, { setErrors, setSubmitting, resetForm }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/user/login`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const token = response.data.data.accessToken;
      dispatch(
        login({
          error: null,
          user: response.data.data.user,
          token,
          tokenExpiration: response.data.tokenExpiration,
        })
      );
      localStorage.setItem("authToken", token);

      resetForm();
      return token;
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
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit,
  });

  return (
    <div className="auth-content">
      <h1 className="logo mb-[50px]">
        Story <span>World</span>
      </h1>
      <h2 className="heading mb-3">Welcome Back, Storyteller</h2>
      <p className="mb-10">
        Log in to continue your storytelling adventure and access your stories.
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
          {isSubmitting ? "Submitting" : "Login To Your Account"}
        </button>
        <p>
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
