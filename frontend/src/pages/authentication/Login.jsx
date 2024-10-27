import { Link } from "react-router-dom";

import { Input } from "../../components/forms";

const Login = () => {
  return (
    <div className="auth-content">
      <h1 className="logo mb-[50px]">
        Story <span>World</span>
      </h1>
      <h2 className="heading mb-3">Welcome Back, Storyteller</h2>
      <p className="mb-10">
        Log in to continue your storytelling adventure and access your stories.
      </p>

      <form method="POST">
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

        <button type="submit" className="button button-block mb-5">
          Login To Your Account
        </button>
        <p>
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
