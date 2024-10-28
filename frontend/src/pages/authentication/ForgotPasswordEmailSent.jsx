import { Link } from "react-router-dom";

const ForgotPasswordEmailSent = () => {
  return (
    <div className="auth-content">
      <h1 className="logo mb-[50px]">
        Story <span>World</span>
      </h1>
      <h2 className="heading mb-3">Check Your Email</h2>
      <p className="mb-10">
        We've sent instructions to your email address to help you securely reset
        your password. Please check your inbox (and spam folder) for further
        steps.
      </p>

      <p>
        Don't have an account? <Link to="/login">Sign In</Link>
      </p>
    </div>
  );
};

export default ForgotPasswordEmailSent;
