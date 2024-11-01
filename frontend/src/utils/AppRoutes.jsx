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
  ForgotPasswordRequest,
} from "../pages/authentication";
import { Dashboard, Profile } from "../pages/dashboard";
import { Home } from "../pages/website";
import { ProfileEdit } from "../components/dashboard";

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
        {
          path: "forgot-password-request",
          element: isAuthenticated ? (
            <Navigate to="/dashboard" />
          ) : (
            <ForgotPasswordRequest />
          ),
        },
      ],
    },
    {
      path: "/",
      element: isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { path: "dashboard", element: <Dashboard /> },
        {
          path: "profile",
          element: <Profile />,
          children: [{ path: "edit", element: <ProfileEdit /> }],
        },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
};

export default AppRoutes;
