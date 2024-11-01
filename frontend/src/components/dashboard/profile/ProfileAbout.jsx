import { Link } from "react-router-dom";
import { HiOutlinePencil } from "react-icons/hi";

const ProfileAbout = ({ user }) => {
  return (
    <div className="card profile-about">
      <div className="card-header">
        <h5 className="card-title">About You</h5>
        <Link to="/profile/edit" className="button button-outline button-sm">
          <HiOutlinePencil />
          <span>Edit About</span>
        </Link>
      </div>
      <div className="card-body">
        {user.about ? user.about : <p>Write something about yourself.</p>}
      </div>
    </div>
  );
};

export default ProfileAbout;
