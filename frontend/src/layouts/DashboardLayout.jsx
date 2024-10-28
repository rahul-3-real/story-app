import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/dashboard";

const DashboardLayout = () => {
  return (
    <div className="db-wrapper">
      <Sidebar />

      <div className="db-content">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
