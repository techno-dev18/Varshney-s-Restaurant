import React, { useState } from "react";
import "../Css/Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    dob: "",
    gender: "",
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Registration failed"
        );
      }

      setMessage("Account created successfully!");

      // Redirect to login after successful registration
      setTimeout(() => {
        navigate("/login");
      }, 1200);

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="signup-section">
      <div className="signup-container">

        <h1>Create Account</h1>

        <p className="signup-text">
          Join SV's Restaurant and enjoy delicious food
          delivered to your doorstep.
        </p>

        <form onSubmit={handleSubmit}>

          {/* Name */}
          <div className="form-group">
            <label htmlFor="name">
              Name
            </label>

            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>


          {/* Phone */}
          <div className="form-group">
            <label htmlFor="phone">
              Phone
            </label>

            <input
              id="phone"
              type="tel"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>


          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>


          {/* Password */}
          <div className="form-group">
            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              minLength="6"
              required
            />
          </div>


          {/* Date of Birth */}
          <div className="form-group">
            <label htmlFor="dob">
              Date of Birth
            </label>

            <input
              id="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>


          {/* Gender */}
          <div className="form-group">
            <label htmlFor="gender">
              Gender
            </label>

            <select
              id="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Gender
              </option>

              <option value="Male">
                Male
              </option>

              <option value="Female">
                Female
              </option>

              <option value="Other">
                Other
              </option>
            </select>
          </div>


          {/* Terms */}
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


          {/* Messages */}
          {error && (
            <p className="error-message">
              {error}
            </p>
          )}

          {message && (
            <p className="success-message">
              {message}
            </p>
          )}


          {/* Create Account */}
          <button
            className="signup-btn"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>


          {/* Divider */}
          <div className="divider">
            <span>OR</span>
          </div>


          {/* Google */}
          <button
            type="button"
            className="google-btn"
            onClick={() =>
              alert("Google login will be added later.")
            }
          >
            <FcGoogle size={22} />

            Sign up with Google
          </button>

        </form>


        {/* Login Link */}
        <p className="login-link">
          Already have an account?

          <Link to="/login">
            {" "}Login
          </Link>
        </p>

      </div>
    </section>
  );
}

export default Signup;