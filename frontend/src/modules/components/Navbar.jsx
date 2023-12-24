import { NavLink, Link } from "react-router-dom";
import { PiSquaresFour, PiHeartStraight, PiListPlus, PiSignOutLight } from 'react-icons/pi';
import avatar from '../../assets/images/avatar/avatar.jpg';

const Navbar = () => {
    return (
        <nav className="navbar collapse">
            <Link to="/" className="logo">
                <h1>ST</h1>
            </Link>
            <ul className="nav-list">
                <li className="nav-item">
                    <NavLink to="/" className="nav-link">
                        <PiSquaresFour />
                        <span>Dashboard</span>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/liked-stories" className="nav-link">
                        <PiHeartStraight />
                        <span>Liked Stories</span>
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/stories" className="nav-link">
                        <PiListPlus />
                        <span>All Stories</span>
                    </NavLink>
                </li>
            </ul>

            <div className="profile">
                <Link to="/" className="profile-info">
                    <img src={avatar} alt="" />
                    <span>
                        <b>La Lisa</b>
                        <i>View Profile</i>
                    </span>
                </Link>

                <button title="Sign Out" className="logout-btn">
                    <PiSignOutLight />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;