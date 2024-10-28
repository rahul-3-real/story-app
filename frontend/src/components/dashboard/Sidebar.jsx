import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsGrid, BsHeart, BsFilter, BsChevronRight } from "react-icons/bs";
import { IoSunny, IoSunnyOutline, IoLogOutOutline } from "react-icons/io5";

import { useTheme, useLogoutUser } from "../../hooks";
import { DummyProfile } from "../../static/images";

const Sidebar = ({ sidebarOpen, toggleSidebar }) => {
  const { themeMode, changeTheme } = useTheme();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = useLogoutUser();

  const imageUrl = user?.avatar
    ? `${import.meta.env.VITE_API_DOMAIN}/static/${user.avatar.replace(
        /public_draft[\\/]/,
        ""
      )}`
    : DummyProfile;

  return (
    <aside className="db-sidebar">
      <button className="toggle" onClick={toggleSidebar}>
        <BsChevronRight />
      </button>

      <div className="content">
        <h1 className="db-logo">
          {sidebarOpen && (
            <>
              Story <span>World</span>
            </>
          )}
          {!sidebarOpen && (
            <>
              S<span>W</span>
            </>
          )}
        </h1>

        <ul className="db-nav">
          <li className="nav-item">
            <NavLink to="/dashboard" className="nav-link">
              <div className="icon">
                <BsGrid />
              </div>
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/liked-stories" className="nav-link">
              <div className="icon">
                <BsHeart />
              </div>
              <span>Liked Stories</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/saved-stories" className="nav-link">
              <div className="icon">
                <BsFilter />
              </div>
              <span>Saved Stories</span>
            </NavLink>
          </li>
        </ul>

        <div className="actions">
          <button className="theme-switch" onClick={changeTheme}>
            <div className="icon">
              {themeMode === "dark" && <IoSunny />}
              {themeMode === "light" && <IoSunnyOutline />}
            </div>
            <span>Switch Theme</span>
          </button>

          <div className="profile">
            <NavLink to="/profile">
              <img src={imageUrl} alt={user.full_name} />
              <span>
                <b>{user.full_name}</b>
                <i>View Profile</i>
              </span>
            </NavLink>
            <button className="logout" title="Logout" onClick={handleLogout}>
              <IoLogOutOutline />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
