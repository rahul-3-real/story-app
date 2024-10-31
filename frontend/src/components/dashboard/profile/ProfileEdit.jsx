import { useSelector } from "react-redux";

import ProfileDetailUpdate from "./ProfileDetailUpdate";
import ProfileEmailUpdate from "./ProfileEmailUpdate";

const ProfileEdit = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      <h4 className="heading">Edit Profile</h4>
      <hr className="heading-divider" />

      <ProfileEmailUpdate user={user} />

      <hr className="heading-divider !my-10" />

      <ProfileDetailUpdate user={user} />
    </>
  );
};

export default ProfileEdit;
