import axios from "axios";
import { Link } from "react-router-dom";
import { HiOutlinePencil } from "react-icons/hi";
import { useDispatch } from "react-redux";

import { FormatDate, CalculateAge } from "../../../utils/FormatDate";
import { showAlert } from "../../../store/slices/alertSlice";

const ProfileDetail = ({ user }) => {
  const dispatch = useDispatch();

  const verifyAccountLink = async () => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/user/verify-account-request`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      dispatch(
        showAlert({
          message: response.data.message,
          type: "success",
        })
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while making this request";
      dispatch(
        showAlert({
          message: errorMessage,
          type: "error",
        })
      );
    }
  };

  return (
    <div className="card profile-about">
      <div className="card-header">
        <h5 className="card-title">Details About Your Profile</h5>
        <Link to="/profile/edit" className="button button-outline button-sm">
          <HiOutlinePencil />
          <span>Edit Profile</span>
        </Link>
      </div>
      <div className="card-body">
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

            {user.country && (
              <tr>
                <th className="w-[250px]">Country</th>
                <td>{user.country}</td>
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
                  <button
                    className="button button-outline button-sm"
                    onClick={verifyAccountLink}
                  >
                    Verify
                  </button>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfileDetail;
