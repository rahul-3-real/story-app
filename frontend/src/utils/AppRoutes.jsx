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
  VerifyAccount,
} from "../pages/authentication";
import { Dashboard, Profile, ProfileDetail } from "../pages/dashboard";
import { Home } from "../pages/website";
import { ProfileAboutUpdate, ProfileEdit } from "../components/dashboard";

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
          element: <Register />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "forgot-password",
          element: <ForgotPassword />,
        },
        {
          path: "forgot-password-email-sent",
          element: <ForgotPasswordEmailSent />,
        },
        {
          path: "forgot-password-request",
          element: <ForgotPasswordRequest />,
        },
        {
          path: "verify-account",
          element: <VerifyAccount />,
        },
      ],
    },
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        { path: "dashboard", element: <Dashboard /> },
        {
          path: "profile",
          element: <Profile />,
          children: [
            { path: "edit", element: <ProfileEdit /> },
            { path: "about", element: <ProfileAboutUpdate /> },
          ],
        },
        {
          path: ":username",
          element: <ProfileDetail />,
        },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
};

export default AppRoutes;
