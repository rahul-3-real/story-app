import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { showAlert } from "../../store/slices/alertSlice";
import {
  Breadcrumb,
  ProfileAbout,
  ProfileContent,
  ProfileDetail as ProfileDetailComponent,
} from "../../components/dashboard";

const ProfileDetail = () => {
  const dispatch = useDispatch();
  const { username } = useParams();
  const [userProfile, setUserProfile] = useState(null);
  const user = useSelector((state) => state.auth.user);

  const breadcrumbData = {
    Dashboard: "/dashboard",
    Profile: "current",
  };

  const fetchUserData = async (username) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/user/?username=${username}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setUserProfile(response.data.data);
    } catch (error) {
      setUserProfile(null);
      const errorMessage = error.response?.data?.message || "No user found.";
      dispatch(
        showAlert({
          message: errorMessage,
          type: "error",
        })
      );
    }
  };

  useEffect(() => {
    fetchUserData(username);
  }, [username]);

  return (
    <div className="container">
      <Breadcrumb data={breadcrumbData} />

      {userProfile && (
        <>
          <ProfileContent user={user} userProfile={userProfile} />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-7">
            <div className="col-span-3">
              <ProfileAbout user={user} userProfile={userProfile} />
            </div>
            <div className="col-span-2">
              <ProfileDetailComponent user={user} userProfile={userProfile} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileDetail;
