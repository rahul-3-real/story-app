import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdOutlineModeEdit } from "react-icons/md";

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

      <Link to="/profile/edit">
        <MdOutlineModeEdit />
        <span>Edit Profile</span>
      </Link>
    </div>
  );
};

export default Profile;
