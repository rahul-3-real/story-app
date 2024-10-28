import { BsGrid, BsHeart, BsFilter } from "react-icons/bs";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="db-sidebar">
      <h1 className="db-logo">
        Story <span>World</span>
        {/* S<span>W</span> */}
      </h1>

      <ul>
        <li>
          <NavLink to="/dashboard">
            <BsGrid />
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard">
            <BsHeart />
            <span>Liked Stories</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard">
            <BsFilter />
            <span>Saved Stories</span>
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
