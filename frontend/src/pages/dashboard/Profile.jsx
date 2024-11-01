import axios from "axios";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Modal from "../../components/Modal";
import {
  Breadcrumb,
  ProfileAbout,
  ProfileContent,
  ProfileDetail,
} from "../../components/dashboard";
import { updateProfile } from "../../store/slices/authSlice";
import { showAlert } from "../../store/slices/alertSlice";

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const breadcrumbData = {
    Dashboard: "/dashboard",
    Profile: "current",
  };

  const pathsToCheck = ["/profile/edit", "/profile/about"];
  const isDetailsModalOpen = pathsToCheck.some((path) =>
    location.pathname.includes(path)
  );

  const handleCloseModal = () => {
    navigate("/profile");
  };

  // Update user data on route change or component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/user/profile`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        // Dispatch the user profile data to Redux store
        dispatch(updateProfile(response.data.data));
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "An error occurred during update.";
        dispatch(
          showAlert({
            message: errorMessage,
            type: "error",
          })
        );
      }
    };

    fetchUserData();
  }, [dispatch, location.pathname]);

  return (
    <>
      <div className="container">
        <Breadcrumb data={breadcrumbData} />

        <ProfileContent user={user} />

        <div className="grid grid-cols-1 md:grid-cols-5 gap-7">
          <div className="col-span-3">
            <ProfileAbout user={user} />
          </div>
          <div className="col-span-2">
            <ProfileDetail user={user} />
          </div>
        </div>
      </div>

      <Modal
        show={isDetailsModalOpen}
        onClose={handleCloseModal}
        redirectTo="/profile"
      >
        <Outlet />
      </Modal>
    </>
  );
};

export default Profile;
