import axios from "axios";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";

const useLogoutUser = () => {
  const dispatch = useDispatch();

  // Handle Logout
  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/user/logout`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      // Clear all storage
      localStorage.clear();
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });

      // Reset the Redux store
      dispatch(logout());
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return handleLogout;
};

export default useLogoutUser;
