import { Outlet } from "react-router-dom";

import { AuthBG } from "../static/images";

const AuthLayout = () => {
  return (
    <section className="auth-section">
      <div className="image">
        <img src={AuthBG} alt="Story App - Authentication Background" />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </section>
  );
};

export default AuthLayout;
