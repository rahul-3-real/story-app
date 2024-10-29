import { NavLink, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { TbNotes, TbHeart } from "react-icons/tb";
import { FiUser } from "react-icons/fi";

import { Breadcrumb, ProfileContent } from "../../components/dashboard";

const Profile = () => {
  const breadcrumbData = {
    Dashboard: "/dashboard",
    Profile: "current",
  };

  const user = useSelector((state) => state.auth.user);

  return (
    <div className="container">
      <Breadcrumb data={breadcrumbData} />

      <ProfileContent user={user} />

      <ul className="db-tab">
        <li className="tab-item">
          <NavLink to="/profile" className="tab-link">
            <FiUser />
            <span>About</span>
          </NavLink>
        </li>
        <li className="tab-item">
          <NavLink to="/profile/created" className="tab-link">
            <TbNotes />
            <span>Created</span>
          </NavLink>
        </li>
        <li className="tab-item">
          <NavLink to="/profile/favourites" className="tab-link">
            <TbHeart />
            <span>Favourites</span>
          </NavLink>
        </li>
      </ul>
      <div className="db-tab-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
