import { Link } from "react-router-dom";
import { MdVerified } from "react-icons/md";

import { DummyProfile } from "../../../static/images";

const ProfileContent = ({ user }) => {
  const imageUrl = user?.avatar
    ? `${import.meta.env.VITE_API_DOMAIN}/static/${user.avatar.replace(
        /public_draft[\\/]/,
        ""
      )}`
    : DummyProfile;

  return (
    <div className="profile-content mb-7">
      <div className="profile-image">
        <img src={imageUrl} alt={user.full_name} />
      </div>
      <div className="profile-info">
        <h2>{user.full_name}</h2>
        <Link to={`/@${user.username}`} className="username mt-3">
          @{user.username} {user.verified && <MdVerified title="Verified" />}
        </Link>

        <div className="follow-list mt-7">
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
      </div>
      <div className="profile-actions">
        <button className="button button-outline button-sm">Message</button>
        <button className="button button-sm">Follow</button>
      </div>
    </div>
  );
};

export default ProfileContent;
