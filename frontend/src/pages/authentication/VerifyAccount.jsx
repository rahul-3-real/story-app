import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const VerifyAccount = () => {
  const location = useLocation();

  const [isVerified, setIsVerified] = useState(false);

  const queryParams = new URLSearchParams(location.search);
  const paramToken = queryParams.get("token");

  const validateToken = async () => {
    const response = await axios.patch(
      `${
        import.meta.env.VITE_API_BASE_URL
      }/user/verify-account?token=${paramToken}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      setIsVerified(true);
      return;
    }
    setIsVerified(false);
  };

  // Page Title
  useEffect(() => {
    document.title = "Verify Account - Story App";
    validateToken();
  }, []);

  return (
    <>
      {!isVerified && (
        <div className="auth-content">
          <h1 className="logo mb-[50px]">
            Story <span>World</span>
          </h1>
          <h2 className="heading mb-3">Invalid Token!</h2>
          <p className="mb-10">
            We're sorry, but the account verification token you provided is
            invalid or has expired. <br />
            To proceed, please request a new verification token. Check your
            email for the instructions to verify your account. <br />
            <Link to="/profile">Try Again</Link>
          </p>

          <p className="mt-3">
            If you continue to experience issues, please contact our support
            team for assistance. <br />
            <Link to={`mailto:${import.meta.env.VITE_API_CONTACT_EMAIL}`}>
              {import.meta.env.VITE_API_CONTACT_EMAIL}
            </Link>
          </p>
        </div>
      )}

      {isVerified && (
        <div className="auth-content">
          <h1 className="logo mb-[50px]">
            Story <span>World</span>
          </h1>
          <h2 className="heading mb-3">Account Verified!</h2>
          <p className="mb-10">
            Your account has been successfully verified. Welcome to the
            community! You can now explore all features, connect with others,
            and start your journey with us.
          </p>

          <Link to="/profile" className="button">
            Let's Explore
          </Link>
        </div>
      )}
    </>
  );
};

export default VerifyAccount;
