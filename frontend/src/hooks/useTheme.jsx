import { useState, useEffect } from "react";

function useTheme(defaultMode = "dark") {
  // Check local storage for theme mode or set it to the default
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem("Theme Mode");
    return savedTheme ? savedTheme : defaultMode;
  };

  // Initialize theme state
  const [themeMode, setThemeMode] = useState(getInitialTheme);

  // Update local storage when theme changes
  useEffect(() => {
    localStorage.setItem("Theme Mode", themeMode);
    document.body.setAttribute("data-theme", themeMode);
  }, [themeMode]);

  // Function to change theme
  const changeTheme = (mode) => {
    if (mode === "light" || mode === "dark") {
      setThemeMode(mode);
    } else {
      // Toggle theme
      setThemeMode((prevMode) => (prevMode === "dark" ? "light" : "dark"));
    }
  };

  return { themeMode, changeTheme };
}

export default useTheme;
