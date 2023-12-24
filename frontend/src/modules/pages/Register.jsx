import { useReducer } from "react";
import axios from "axios";
import { Input } from "../components";
import { Link } from "react-router-dom";

const Register = () => {
  //* Initial State
  const initialFormState = {
    username: "",
    email: "",
    fullname: "",
    password: "",
    loading: false,
    error: null,
  };

  //* Define reducer function
  const reducer = (state, action) => {
    switch (action.type) {
      case "FIELD_CHANGE":
        return { ...state, [action.field]: action.value, error: null };
      case "REGISTER_START":
        return { ...state, loading: true, error: null };
      case "REGISTER_SUCCESS":
        return { ...initialFormState, loading: false };
      case "REGISTER_ERROR":
        return { ...state, loading: false, error: action.error };
      default:
        return state;
    }
  };

  //* useReducer returns state and dispatch
  const [state, dispatch] = useReducer(reducer, initialFormState);

  const handleInputChange = (e) => {
    dispatch({
      type: "FIELD_CHANGE",
      field: e.target.id,
      value: e.target.value,
    });
  };

  const registerUserHandler = async (e) => {
    e.preventDefault();

    dispatch({ type: "REGISTER_START" });

    try {
      const url = `http://localhost:3001/api/auth/register`;
      await axios.post(url, {
        username: state.username,
        email: state.email,
        fullname: state.fullname,
        password: state.password,
      });

      dispatch({ type: "REGISTER_SUCCESS" });
      console.log("Registration successful");
    } catch (error) {
      dispatch({ type: "REGISTER_ERROR", error: error.response.data.message });
      console.log(error);
    }
  };

  return (
    <>
      <section className="auth-page">
        <form method="POST" onSubmit={registerUserHandler}>
          <h4 className="auth-heading">
            Story <span>Times</span>
          </h4>
          <p className="text-heading-clr mb-7">
            Create an account to enjoy reading.
          </p>
          <Input
            type="text"
            placeholder="Full Name"
            id="fullname"
            value={state?.fullname}
            onChange={handleInputChange}
            required="true"
          />
          <Input
            type="text"
            placeholder="Email Id."
            id="email"
            value={state?.email}
            onChange={handleInputChange}
            required="true"
          />
          <Input
            type="text"
            placeholder="Username"
            id="username"
            value={state?.username}
            onChange={handleInputChange}
            required="true"
          />
          <Input
            type="password"
            placeholder="Password"
            id="password"
            value={state?.password}
            onChange={handleInputChange}
            required="true"
          />
          <button
            className="button-block"
            type="submit"
            disabled={state?.loading}
          >
            {state?.loading ? "Registering..." : "Register"}
          </button>
          {state?.error && <p style={{ color: "red" }}>{state?.error}</p>}
        </form>
        <ul>
          <li>
            <Link to="/login">Login to Account</Link>
          </li>
        </ul>
      </section>
    </>
  );
};

export default Register;
