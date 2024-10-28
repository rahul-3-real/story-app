import { useSelector } from "react-redux";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import { WebsiteLayout, DashboardLayout, AuthLayout } from "../layouts";
import {
  Register,
  Login,
  ForgotPassword,
  ForgotPasswordEmailSent,
} from "../pages/authentication";
import { Dashboard } from "../pages/dashboard";
import { Home } from "../pages/website";

const AppRoutes = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <WebsiteLayout />,
      children: [
        {
          path: "/",
          element: isAuthenticated ? <Home /> : <Navigate to="/login" />,
        },
      ],
    },
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        {
          path: "register",
          element: isAuthenticated ? (
            <Navigate to="/dashboard" />
          ) : (
            <Register />
          ),
        },
        {
          path: "login",
          element: isAuthenticated ? <Navigate to="/dashboard" /> : <Login />,
        },
        {
          path: "forgot-password",
          element: isAuthenticated ? (
            <Navigate to="/dashboard" />
          ) : (
            <ForgotPassword />
          ),
        },
        {
          path: "forgot-password-email-sent",
          element: isAuthenticated ? (
            <Navigate to="/dashboard" />
          ) : (
            <ForgotPasswordEmailSent />
          ),
        },
      ],
    },
    {
      path: "/",
      element: isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [{ path: "/dashboard", element: <Dashboard /> }],
    },
  ]);

  return <RouterProvider router={routes} />;
};

export default AppRoutes;
