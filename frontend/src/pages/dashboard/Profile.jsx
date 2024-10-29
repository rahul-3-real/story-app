import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdVerified } from "react-icons/md";
import { MdOutlineModeEdit } from "react-icons/md";

import { Breadcrumb } from "../../components/dashboard";
import { DummyProfile } from "../../static/images";

const Profile = () => {
  const breadcrumbData = {
    Dashboard: "/dashboard",
    Profile: "current",
  };

  const user = useSelector((state) => state.auth.user);

  const imageUrl = user?.avatar
    ? `${import.meta.env.VITE_API_DOMAIN}/static/${user.avatar.replace(
        /public_draft[\\/]/,
        ""
      )}`
    : DummyProfile;

  return (
    <div className="container">
      <Breadcrumb data={breadcrumbData} />

      <div className="profile-content">
        <div className="profile-image">
          <img src={imageUrl} alt={user.full_name} />
        </div>
        <div className="profile-info">
          <div className="profile-actions">
            <button className="button button-outline button-sm">Message</button>
            <button className="button button-sm">Follow</button>
          </div>

          <h2>
            {user.full_name} {!user.verified && <MdVerified title="Verified" />}
          </h2>

          <div className="follow-list">
            <Link to="/profile" className="follow-link">
              <span>30</span>
              Posts
            </Link>
            <Link to="/profile" className="follow-link">
              <span>1.5K</span>
              Followers
            </Link>
            <Link to="/profile" className="follow-link">
              <span>115</span>
              Following
            </Link>
          </div>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
            praesentium eius repellat at quis ipsum?
          </p>
        </div>
      </div>

      <Link to="/profile/edit">
        <MdOutlineModeEdit />
        <span>Edit Profile</span>
      </Link>
    </div>
  );
};

export default Profile;
