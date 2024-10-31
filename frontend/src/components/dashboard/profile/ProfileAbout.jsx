import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiOutlinePencil } from "react-icons/hi";

import { FormatDate, CalculateAge } from "../../../utils/FormatDate";

const ProfileAbout = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="profile-about">
      <div className="table-caption">
        <h5>Details About Your Profile</h5>
        <Link to="/profile/edit" className="button button-outline button-sm">
          <HiOutlinePencil />
          <span>Edit Profile</span>
        </Link>
      </div>
      <table className="table">
        <tbody>
          {user.full_name && (
            <tr>
              <th className="w-[250px]">Full Name</th>
              <td>{user.full_name}</td>
            </tr>
          )}

          {user.email && (
            <tr>
              <th className="w-[250px]">Email</th>
              <td>
                <Link to={`mailto:${user.email}`} className="text-primary">
                  {user.email}
                </Link>
              </td>
            </tr>
          )}

          {user.date_of_birth && (
            <tr>
              <th className="w-[250px]">Date Of Birth</th>
              <td>
                {FormatDate(user.date_of_birth)}{" "}
                <i className="ms-3 text-sm text-primary">
                  {CalculateAge(FormatDate(user.date_of_birth))} years
                </i>
              </td>
            </tr>
          )}

          {user.gender && (
            <tr>
              <th className="w-[250px]">Gender</th>
              <td>{user.gender}</td>
            </tr>
          )}

          <tr>
            <th className="w-[250px]">Verified</th>
            <td>
              {user.verified ? (
                <button className="button button-sm !cursor-no-drop" disabled>
                  Verified
                </button>
              ) : (
                <button className="button button-outline button-sm">
                  Verify
                </button>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProfileAbout;
