import { useEffect } from "react";

const Dashboard = () => {
  // Page Title
  useEffect(() => {
    document.title = "Dashboard - Story App";
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
