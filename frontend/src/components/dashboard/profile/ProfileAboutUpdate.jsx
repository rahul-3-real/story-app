import axios from "axios";
import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { TextArea } from "../../forms";
import { aboutSchemaValidation } from "../../../utils/ValidationSchema";
import { showAlert } from "../../../store/slices/alertSlice";
import { updateProfile, setAuthError } from "../../../store/slices/authSlice";

const ProfileAboutUpdate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const [isUpdated, setIsUpdated] = useState(false);

  const initialValues = {
    about: user?.about || "",
  };

  // Submit Form
  const onSubmit = async (values, { setErrors, setSubmitting, resetForm }) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/user/update-about`,
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
    validationSchema: aboutSchemaValidation,
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
      <h4 className="sub-heading mb-5">About You!</h4>
      <form method="POST" onSubmit={handleSubmit}>
        <TextArea
          label="About"
          placeholder="Type something about yourself..."
          id="about"
          name="about"
          value={values.about}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.about && errors.about}
          required
        />

        <button type="submit" className="button" disabled={isSubmitting}>
          <span>{isSubmitting ? "Updating..." : "Update About"}</span>
        </button>
      </form>

      {isUpdated && (
        <div className="text-md text-success mt-4">
          About updated successfully!
        </div>
      )}

      {errors.apiError && (
        <div className="text-md text-error mt-4">{errors.apiError}</div>
      )}
    </>
  );
};

export default ProfileAboutUpdate;
