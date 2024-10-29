import { Outlet } from "react-router-dom";
import { Sidebar, Header } from "../components/dashboard";
import { useToggleSidebar } from "../hooks";

const DashboardLayout = () => {
  const { sidebarOpen, toggleSidebar } = useToggleSidebar();

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
