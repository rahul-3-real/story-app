import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import { WebsiteLayout, DashboardLayout, AuthLayout } from "../layouts";
import { Register, Login } from "../pages/authentication";
import { Dashboard } from "../pages/dashboard";
import { Home } from "../pages/website";

const AppRoutes = () => {
  const isAuthenticated = false; // Replace with actual authentication logic

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <WebsiteLayout />,
      children: [{ path: "/", element: <Home /> }],
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
