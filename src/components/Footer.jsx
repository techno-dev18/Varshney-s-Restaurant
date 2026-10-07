import React from "react";
import { Link } from "react-router-dom";
import "../Css/Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Brand */}
        <div className="footer-brand">
          <p className="footer-eyebrow">
            Varshney's Group
          </p>

          <h2>
            Dining.<br />
            Celebrations.<br />
            Hospitality.
          </h2>

          <p className="footer-description">
            Creating memorable dining, celebration and
            hospitality experiences with quality, warmth
            and thoughtful service.
          </p>
        </div>

        {/* Explore */}
        <div className="footer-column">
          <h3>Explore</h3>

          <Link to="/">Home</Link>
          <Link to="/foodmenu">Food Menu</Link>
          <Link to="/rooms">Rooms & Halls</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact Us</Link>
        </div>

        {/* Account */}
        <div className="footer-column">
          <h3>Account</h3>

          <Link to="/login">Login</Link>
          <Link to="/signup">Create Account</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/orders">My Orders</Link>
          <Link to="/bookings">My Bookings</Link>
        </div>

        {/* Contact */}
        <div className="footer-contact">
          <h3>Contact</h3>

          <div className="footer-contact-item">
            <span>Address</span>
            <p>
              123 Main Street,
              <br />
              City, State, India
            </p>
          </div>

          <div className="footer-contact-item">
            <span>Phone</span>
            <p>+91 1234567890</p>
          </div>

          <div className="footer-contact-item">
            <span>Email</span>
            <p>info@varshneys.com</p>
          </div>
        </div>

      </div>

      <div className="footer-divider"></div>

      {/* Footer Middle */}
      <div className="footer-middle">

        <div className="footer-tagline">
          <span>GOOD FOOD</span>
          <span className="footer-dot">•</span>
          <span>GREAT MOMENTS</span>
          <span className="footer-dot">•</span>
          <span>LASTING MEMORIES</span>
        </div>

        <button
          type="button"
          className="footer-top"
          onClick={scrollToTop}
        >
          <span>Back to Top</span>
          <span className="footer-arrow">↑</span>
        </button>

      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">

        <p>
          © {currentYear} Varshney's Group. All rights reserved.
        </p>

        <div className="footer-legal">
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/contact">Support</Link>
        </div>

      </div>

    </footer>
  );
}

export default Footer;