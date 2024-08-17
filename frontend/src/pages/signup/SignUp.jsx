import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";
import "./SignUp.scss";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const { loading, signup } = useSignup();

  const handleCheckboxChange = (gender) => {
    setInputs({ ...inputs, gender });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1 className="signup-title">
          Sign Up <span className="highlight">ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="form-input"
              value={inputs.fullName}
              onChange={(e) =>
                setInputs({ ...inputs, fullName: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              placeholder="johndoe"
              className="form-input"
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              className="form-input"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="form-input"
              value={inputs.confirmPassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
            />
          </div>

          <GenderCheckbox
            onCheckboxChange={handleCheckboxChange}
            selectedGender={inputs.gender}
          />

          <Link to="/login" className="login-link">
            Already have an account?
          </Link>

          <div>
            <button className="signup-button" disabled={loading}>
              {loading ? <span className="loading-spinner"></span> : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
