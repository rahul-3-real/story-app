import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

import { AuthBG } from "../static/images";

const AuthLayout = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

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
