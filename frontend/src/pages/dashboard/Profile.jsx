import { Breadcrumb } from "../../components/dashboard";

const Profile = () => {
  const breadcrumbData = {
    Dashboard: "/dashboard",
    Profile: "current",
  };

  return (
    <div className="container">
      <Breadcrumb data={breadcrumbData} />
      <h1>Profile</h1>
    </div>
  );
};

export default Profile;
