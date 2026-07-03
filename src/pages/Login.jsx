import React from "react";
import "../Appcss/Login.css";
import { Link } from "react-router-dom";

function Login() {
  return (
    <section className="login-section">
      <div className="login-container">
        <h1>Welcome Back!</h1>
        <p className="login-subtitle">
          Sign in to continue your delicious journey with SV's Restaurant.
        </p>

        <form className="login-form">
          <div className="input-group">
            <input
              type="text"
              placeholder="Username"
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              required
            />
          </div>

          <div className="login-options">
            <Link to="/forgot-password">
              Forgot Password?
            </Link>
          </div>

          <button type="submit">
            Log In
          </button>
        </form>

        <p className="signup-link">
          Don't have an account?
          <Link to="/signup"> Sign Up</Link>
        </p>
      </div>
    </section>
  );
}

export default Login;