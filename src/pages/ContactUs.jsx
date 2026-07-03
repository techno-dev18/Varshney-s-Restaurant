import React from "react";
import "../Appcss/ContactUs.css";

function ContactUs() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! We will contact you soon.");
  };

  return (
    <>
      {/* HERO */}
      <section className="hero-section">
        <h1>Contact Us</h1>
        <p>We're here to help you 24/7</p>
      </section>

      <div className="contact-container">
        <div className="contact-row">

          {/* LEFT SIDE */}
          <div className="contact-left">

            <div className="contact-card">
              <h3>📍 Address</h3>
              <p>Varshney's Group Restaurant</p>
              <p>123 Main Street, Delhi, India</p>
            </div>

            <div className="contact-card">
              <h3>📞 Phone</h3>
              <p>+91 9876543210</p>
              <p>+91 9123456780</p>
            </div>

            <div className="contact-card">
              <h3>📧 Email</h3>
              <p>info@varshneys.com</p>
              <p>support@varshneys.com</p>
            </div>

            <div className="contact-card">
              <h3>⏰ Opening Hours</h3>
              <p>Mon - Sun: 10:00 AM – 11:00 PM</p>
            </div>

            <div className="contact-card">
              <h3>🌐 Follow Us</h3>

              <div className="social-icons">
                {/* <a href="#">Instagram</a>
                <a href="#">Facebook</a>
                <a href="#">Twitter</a>
                <a href="#">LinkedIn</a> */}
              </div>
            </div>

            <div className="contact-card">
              <h3>💬 Need Instant Help?</h3>

              <p>
                Chat with our support team on WhatsApp for quick assistance regarding
                orders, reservations, and catering services.
              </p>

              <button className="whatsapp-btn">
                Chat on WhatsApp
              </button>
            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="contact-right">

            <div className="contact-card contact-form">
              <h3>Send a Message</h3>

              <form onSubmit={handleSubmit}>

                <input
                  type="text"
                  placeholder="Full Name"
                  required
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  required
                />

                <input
                  type="tel"
                  placeholder="Phone Number"
                />

                <select>
                  <option>General Inquiry</option>
                  <option>Table Booking</option>
                  <option>Order Issue</option>
                  <option>Feedback</option>
                  <option>Partnership</option>
                </select>

                <textarea
                  rows="5"
                  placeholder="Your Message"
                ></textarea>

                <button type="submit" className="send-btn">
                  Send Message
                </button>

              </form>
            </div>

            {/* FAQ */}
            <div className="contact-card">
              <h3>❓ Frequently Asked Questions</h3>

              <p><strong>Q:</strong> Do you offer home delivery?</p>
              <p><strong>A:</strong> Yes, across major cities.</p>

              <p><strong>Q:</strong> Can I book a hall?</p>
              <p><strong>A:</strong> Yes, through our booking section.</p>

              <p><strong>Q:</strong> Do you provide catering?</p>
              <p><strong>A:</strong> Yes for weddings & events.</p>
            </div>

          </div>

        </div>

        {/* MAP */}
        <div className="contact-card map">
          <h3>📍 Find Us</h3>

          <iframe
            title="Delhi Location"
            src="https://maps.google.com/maps?q=delhi&t=&z=13&ie=UTF8&iwloc=&output=embed"
          ></iframe>
        </div>

        {/* BRANCHES */}
        <div className="contact-card">
          <h3>🏢 Our Branches</h3>

          <ul>
            <li>Delhi - Main Branch</li>
            <li>Noida - Sector 18</li>
            <li>Gurgaon - Cyber City</li>
            <li>Agra - Taj Road</li>
          </ul>
        </div>

      </div>
    </>
  );
}

export default ContactUs;