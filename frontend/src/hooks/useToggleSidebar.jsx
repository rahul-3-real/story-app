import { useState, useEffect } from "react";

const useToggleSidebar = (defaultState = true) => {
  const getInitialState = () => {
    const savedToggleState = localStorage.getItem("Sidebar Status");
    return savedToggleState !== null
      ? JSON.parse(savedToggleState)
      : defaultState;
  };

  const [sidebarOpen, setSidebarOpen] = useState(getInitialState);

  useEffect(() => {
    localStorage.setItem("Sidebar Status", JSON.stringify(sidebarOpen));
  }, [sidebarOpen]);

  const toggleSidebar = () => {
    setSidebarOpen((prevState) => !prevState);
  };

  return { sidebarOpen, toggleSidebar };
};

export default useToggleSidebar;
