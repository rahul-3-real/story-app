import axios from "axios";
import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Input } from "../../forms";
import { emailSchema } from "../../../utils/ValidationSchema";
import { showAlert } from "../../../store/slices/alertSlice";
import { updateProfile, setAuthError } from "../../../store/slices/authSlice";

const ProfileEmailUpdate = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isUpdated, setIsUpdated] = useState(false);

  const initialValues = {
    newEmail: user?.email || "",
  };

  // Submit Form
  const onSubmit = async (values, { setErrors, setSubmitting, resetForm }) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/user/update-email`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      dispatch(
        updateProfile({
          error: null,
          user: response.data.data.user,
        })
      );
      dispatch(
        showAlert({
          message: response.data.message,
          type: "success",
        })
      );

      resetForm();
      setIsUpdated(true);
      setTimeout(() => setIsUpdated(false), 3000);
      navigate("/profile");
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
  const formik = useFormik({
    initialValues,
    validationSchema: emailSchema,
    onSubmit,
    enableReinitialize: true,
  });
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = formik;

  return (
    <>
      <p className="text-sm text-error mt-1 mb-7">
        Please note, updating your email will unverify your account. You will
        need to verify your new email address to regain full access.
      </p>
      <form method="POST" onSubmit={handleSubmit}>
        <Input
          type="email"
          label="Email"
          placeholder="Enter your Email Id."
          id="email"
          name="newEmail"
          value={values.newEmail}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.newEmail && errors.newEmail}
          required
        />

        <button type="submit" className="button" disabled={isSubmitting}>
          <span>{isSubmitting ? "Updating..." : "Update Email"}</span>
        </button>
      </form>

      {isUpdated && (
        <div className="text-md text-success mt-4">
          Email updated successfully!
        </div>
      )}

      {errors.apiError && (
        <div className="text-md text-error mt-4">{errors.apiError}</div>
      )}
    </>
  );
};

export default ProfileEmailUpdate;
