import axios from "axios";
import { useEffect } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TbNotes, TbHeart } from "react-icons/tb";
import { FiUser } from "react-icons/fi";

import Modal from "../../components/Modal";
import { Breadcrumb, ProfileContent } from "../../components/dashboard";
import { updateProfile } from "../../store/slices/authSlice";
import { showAlert } from "../../store/slices/alertSlice";

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const breadcrumbData = {
    Dashboard: "/dashboard",
    Profile: "current",
  };

  const user = useSelector((state) => state.auth.user);

  const pathsToCheck = ["/profile/edit"];
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

        <ul className="db-tab">
          <li className="tab-item">
            <NavLink to="/profile" className="tab-link">
              <FiUser />
              <span>About</span>
            </NavLink>
          </li>
          <li className="tab-item">
            <NavLink to="/profile/created" className="tab-link">
              <TbNotes />
              <span>Created</span>
            </NavLink>
          </li>
          <li className="tab-item">
            <NavLink to="/profile/favourites" className="tab-link">
              <TbHeart />
              <span>Favourites</span>
            </NavLink>
          </li>
        </ul>
        <div className="db-tab-content">
          <Outlet />
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
