import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Alert from "./components/Alert";
import AppRoutes from "./utils/AppRoutes";
import FetchUserData from "./utils/FetchUserData";
import { hideAlert } from "./store/slices/alertSlice";
import { login, setLoading } from "./store/slices/authSlice";

const App = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const alert = useSelector((state) => state.alert);

  // Get User data
  useEffect(() => {
    const initializeUser = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        const userData = await FetchUserData();
        if (userData) {
          dispatch(
            login({
              isAuthenticated: true,
              loading: false,
              user: userData,
              error: null,
            })
          );
        } else {
          dispatch(setLoading(false));
        }
      } else {
        dispatch(setLoading(false));
      }
    };

    initializeUser();
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Close Alert Handler
  const handleCloseAlert = () => {
    dispatch(hideAlert());
  };

  return (
    <>
      {alert.visible && (
        <Alert
          className={`alert-${alert.type}`}
          message={alert.message}
          onClose={handleCloseAlert}
        />
      )}

      <AppRoutes />
    </>
  );
};

export default App;
