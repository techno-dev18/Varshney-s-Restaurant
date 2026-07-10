import React from 'react'
import "../Appcss/Footer.css";
import { Link } from "react-router-dom";
export default function Footer() {
 const scrollToSection = (id) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  };
  return (
    <footer className="footer">
      <div className="footer-container">
 <button
          className="btn"
          onClick={() => scrollToSection("home")}
        >
          Back to Top
        </button>
        <div className="footer-brand">
          <h2>Varshney's Group Restaurant</h2>
          <p>
            Luxury dining, events & hospitality across India.
          </p>
        </div>

        <div className="footer-links">
          <h3>Company</h3>

          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact Us</Link>
            <Link to="/menu">Menu</Link>
            
        </div>

        <div className="footer-contact">
          <h3>Contact</h3>

          <p>
            <strong>Address:</strong> 123 Main Street, City, State
          </p>

          <p>
            <strong>Phone:</strong> +91 1234567890
          </p>

          <p>
            <strong>Email:</strong> info@varshneys.com
          </p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © 2025 Varshney's Group Restaurant. All rights reserved.
        </p>
      </div>
    </footer>
  );
}



