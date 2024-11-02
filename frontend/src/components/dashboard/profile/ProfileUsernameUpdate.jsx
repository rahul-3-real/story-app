import axios from "axios";
import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Input } from "../../forms";
import { usernameSchema } from "../../../utils/ValidationSchema";
import { showAlert } from "../../../store/slices/alertSlice";
import { updateProfile, setAuthError } from "../../../store/slices/authSlice";

const ProfileUsernameUpdate = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isUpdated, setIsUpdated] = useState(false);

  const initialValues = {
    newUsername: user?.username || "",
  };

  // Submit Form
  const onSubmit = async (values, { setErrors, setSubmitting, resetForm }) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/user/update-username`,
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
    validationSchema: usernameSchema,
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
      <form method="POST" onSubmit={handleSubmit}>
        <Input
          type="text"
          label="Username"
          placeholder="Enter your Username"
          id="username"
          name="newUsername"
          value={values.newUsername}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.newUsername && errors.newUsername}
          required
        />

        <button type="submit" className="button" disabled={isSubmitting}>
          <span>{isSubmitting ? "Updating..." : "Update Username"}</span>
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

export default ProfileUsernameUpdate;
