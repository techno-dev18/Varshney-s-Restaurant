import React from "react";
import "../Appcss/Signup.css";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

function Signup() {
  return (
    <section className="signup-section">
      <div className="signup-container">
        <h1>Create Account</h1>

        <p className="signup-text">
          Join SV's Restaurant and enjoy delicious food delivered to your
          doorstep.
        </p>

        <form>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              type="tel"
              placeholder="Enter phone number"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter password"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="dob">Date of Birth</label>
            <input
              id="dob"
              type="date"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="gender">Gender</label>

            <select
              id="gender"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Select Gender
              </option>

              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div className="checkbox">
            <input
              id="terms"
              type="checkbox"
              required
            />

            <label htmlFor="terms">
              I agree to the Terms & Conditions
            </label>
          </div>

          <button
            className="signup-btn"
            type="submit"
          >
            Create Account
          </button>

          <div className="divider">
            <span>OR</span>
          </div>

          <button
            type="button"
            className="google-btn"
          >
            <FcGoogle size={22} />
            Sign up with Google
          </button>
        </form>

        <p className="login-link">
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>
      </div>
    </section>
  );
}

export default Signup;