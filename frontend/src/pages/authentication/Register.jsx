import { Link } from "react-router-dom";

import { Input } from "../../components/forms";

const Register = () => {
  return (
    <div className="auth-content">
      <h1 className="logo mb-[50px]">
        Story <span>World</span>
      </h1>
      <h2 className="heading mb-3">Join Our Story World</h2>
      <p className="mb-10">
        Create an account to start reading, writing, and sharing stories today.
      </p>

      <form method="POST">
        <Input
          type="text"
          label="Full Name"
          placeholder="Enter your Full Name"
          id="full_name"
          name="full_name"
        />

        <Input
          type="email"
          label="Email"
          placeholder="Enter your Email Id."
          id="email"
          name="email"
        />

        <Input
          type="password"
          label="Password"
          placeholder="Enter your Password"
          id="password"
          name="password"
        />

        <Input
          type="password"
          label="Confirm Password"
          placeholder="Re-Enter your Password"
          id="password2"
          name="password2"
        />

        <button type="submit" className="button button-block mb-5">
          Create Your Account
        </button>
        <p>
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
