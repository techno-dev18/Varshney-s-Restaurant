import React, { useState } from "react";
import "../Css/Login.css";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Login failed"
        );
      }

      // Save JWT token
      localStorage.setItem(
        "token",
        data.token
      );

      // Save logged-in user
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      // Go to home page
      navigate("/");

    } catch (error) {
      setError(error.message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-section">

      <div className="login-container">

        <h1>
          Welcome Back!
        </h1>

        <p className="login-subtitle">
          Sign in to continue your delicious
          journey with SV's Restaurant.
        </p>


        <form
          className="login-form"
          onSubmit={handleSubmit}
        >

          {/* Email */}
          <div className="input-group">

            <label htmlFor="login-email">
              Email
            </label>

            <input
              id="login-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

          </div>


          {/* Password */}
          <div className="input-group">

            <label htmlFor="login-password">
              Password
            </label>

            <input
              id="login-password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

          </div>


          {/* Forgot Password */}
          <div className="login-options">

            <Link to="/forgot-password">
              Forgot Password?
            </Link>

          </div>


          {/* Error */}
          {error && (
            <p className="error-message">
              {error}
            </p>
          )}


          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Logging in..."
              : "Log In"}
          </button>

        </form>


        {/* Signup */}
        <p className="signup-link">

          Don't have an account?

          <Link to="/signup">
            {" "}Sign Up
          </Link>

        </p>

      </div>

    </section>
  );
}

export default Login;