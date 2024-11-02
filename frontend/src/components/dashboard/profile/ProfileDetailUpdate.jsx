import axios from "axios";
import { useState, useMemo } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import countryList from "react-select-country-list";

import { Input, Select } from "../../forms";
import { profileSchema } from "../../../utils/ValidationSchema";
import { showAlert } from "../../../store/slices/alertSlice";
import { updateProfile, setAuthError } from "../../../store/slices/authSlice";
import { FormatInputDate } from "../../../utils/FormatDate";

const ProfileDetailUpdate = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isUpdated, setIsUpdated] = useState(false);
  const options = useMemo(() => countryList().getData(), []);

  const initialValues = {
    full_name: user?.full_name || "",
    date_of_birth: FormatInputDate(user?.date_of_birth) || "",
    gender: user?.gender || "",
    country: user?.country || "",
  };

  const onSubmit = async (values, { setErrors, setSubmitting, resetForm }) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/user/update-profile`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      dispatch(updateProfile(response.data.data));

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

  const formik = useFormik({
    initialValues,
    validationSchema: profileSchema,
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
        <div className="grid grid-cols-2 sm:gird-cols-1 gap-5">
          <div className="col">
            <Input
              type="text"
              label="Full Name"
              placeholder="Enter your Full Name"
              id="full_name"
              name="full_name"
              value={values.full_name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.full_name && errors.full_name}
              required
            />
          </div>

          <div className="col">
            <Select
              label="Gender"
              name="gender"
              value={values.gender}
              options={[
                { label: "Male", value: "Male" },
                { label: "Female", value: "Female" },
                { label: "Other", value: "Other" },
              ]}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.gender && errors.gender}
            />
          </div>

          <div className="col">
            <Input
              type="date"
              label="Date of Birth"
              placeholder="Enter your Date of Birth."
              id="date_of_birth"
              name="date_of_birth"
              value={values.date_of_birth}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.date_of_birth && errors.date_of_birth}
            />
          </div>

          <div className="col">
            <Select
              label="Country"
              name="country"
              value={values.country}
              options={options}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.country && errors.country}
            />
          </div>
        </div>

        <button type="submit" className="button" disabled={isSubmitting}>
          <span>{isSubmitting ? "Updating..." : "Update Details"}</span>
        </button>
      </form>

      {isUpdated && (
        <div className="text-md text-success mt-4">
          Profile updated successfully!
        </div>
      )}

      {errors.apiError && (
        <div className="text-md text-error mt-4">{errors.apiError}</div>
      )}
    </>
  );
};

export default ProfileDetailUpdate;
