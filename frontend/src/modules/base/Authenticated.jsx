import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Header, Navbar, Wrapper } from "../components";

const Authenticated = ({
  themeMode,
  setThemeMode,
  pathname,
  hideMainPaths,
  isAuthenticated,
}) => {
  // State
  const [navbarStatus, setNavbarStatus] = useState(true);

  if (hideMainPaths.includes(pathname) && isAuthenticated) {
    return <Navigate to="/" />;
  } else {
    return (
      <>
        <main className={`main ${navbarStatus ? "collapsed" : ""}`}>
          <Navbar />
          <div className="wrapper">
            <Header
              navbarStatus={navbarStatus}
              setNavbarStatus={setNavbarStatus}
              themeMode={themeMode}
              setThemeMode={setThemeMode}
            />
            <Wrapper />
          </div>
        </main>
      </>
    );
  }
};

export default Authenticated;
