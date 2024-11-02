import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

import { Sidebar, Header } from "../components/dashboard";
import { useToggleSidebar } from "../hooks";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { sidebarOpen, toggleSidebar } = useToggleSidebar();

  // Redirect unauthenticated users
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  return (
    <div className={`db-wrapper ${!sidebarOpen ? "collapsed" : ""}`}>
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="db-content">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
