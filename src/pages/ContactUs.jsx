import React from "react";
import "../Css/ContactUs.css";

function ContactUs() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! We will contact you soon.");
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      "Hello Varshney's Group, I need assistance regarding your restaurant, orders, reservations, or catering services."
    );

    window.open(
      `https://wa.me/919876543210?text=${message}`,
      "_blank"
    );
  };

  return (
    <main className="vcontact">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="vcontact-hero">
        <div className="vcontact-hero-content">
          <p className="vcontact-eyebrow">Varshney's Group</p>

          <h1>Contact Us</h1>

          <span className="vcontact-rule"></span>

          <p>
            We are here to help with your dining,
            reservations and celebrations.
          </p>
        </div>
      </section>

      {/* =====================================================
          MAIN CONTACT CONTENT
      ===================================================== */}

      <section className="vcontact-section">
        <div className="vcontact-container">

          <div className="vcontact-intro">
            <div>
              <p className="vcontact-kicker">Get in touch</p>

              <h2>
                We'd love to hear from you
              </h2>
            </div>

            <p>
              Whether you have a question about our menu,
              want to reserve a table, plan an event or simply
              share your experience, our team is ready to assist you.
            </p>
          </div>

          <div className="vcontact-grid">

            {/* =================================================
                LEFT COLUMN
            ================================================= */}

            <div className="vcontact-left">

              <div className="vcontact-card">
                <span className="vcontact-card-label">
                  Visit us
                </span>

                <h3>Our Address</h3>

                <p>
                  Varshney's Group Restaurant
                </p>

                <p>
                  123 Main Street,
                  <br />
                  Delhi, India
                </p>
              </div>

              <div className="vcontact-card">
                <span className="vcontact-card-label">
                  Call us
                </span>

                <h3>Phone</h3>

                <p>+91 9876543210</p>
                <p>+91 9123456780</p>
              </div>

              <div className="vcontact-card">
                <span className="vcontact-card-label">
                  Write to us
                </span>

                <h3>Email</h3>

                <p>info@varshneys.com</p>
                <p>support@varshneys.com</p>
              </div>

              <div className="vcontact-card">
                <span className="vcontact-card-label">
                  Opening hours
                </span>

                <h3>We're open</h3>

                <p>
                  Monday – Sunday
                </p>

                <p>
                  10:00 AM – 11:00 PM
                </p>
              </div>

              <div className="vcontact-card vcontact-whatsapp-card">
                <span className="vcontact-card-label">
                  Need quick assistance?
                </span>

                <h3>Chat with us</h3>

                <p>
                  Get quick assistance regarding orders,
                  reservations and catering services.
                </p>

                <button
                  type="button"
                  className="vcontact-whatsapp"
                  onClick={handleWhatsApp}
                >
                  Chat on WhatsApp
                </button>
              </div>

            </div>

            {/* =================================================
                RIGHT COLUMN
            ================================================= */}

            <div className="vcontact-right">

              <div className="vcontact-form-card">

                <p className="vcontact-kicker">
                  Send us a message
                </p>

                <h2>
                  How can we help?
                </h2>

                <p className="vcontact-form-intro">
                  Fill in the details below and our team
                  will get back to you as soon as possible.
                </p>

                <form onSubmit={handleSubmit}>

                  <div className="vcontact-form-row">

                    <div className="vcontact-field">
                      <label htmlFor="contact-name">
                        Full Name
                      </label>

                      <input
                        id="contact-name"
                        type="text"
                        placeholder="Enter your name"
                        required
                      />
                    </div>

                    <div className="vcontact-field">
                      <label htmlFor="contact-email">
                        Email Address
                      </label>

                      <input
                        id="contact-email"
                        type="email"
                        placeholder="Enter your email"
                        required
                      />
                    </div>

                  </div>

                  <div className="vcontact-form-row">

                    <div className="vcontact-field">
                      <label htmlFor="contact-phone">
                        Phone Number
                      </label>

                      <input
                        id="contact-phone"
                        type="tel"
                        placeholder="Enter your phone number"
                      />
                    </div>

                    <div className="vcontact-field">
                      <label htmlFor="contact-subject">
                        Subject
                      </label>

                      <select
                        id="contact-subject"
                        defaultValue="General Inquiry"
                      >
                        <option value="General Inquiry">
                          General Inquiry
                        </option>

                        <option value="Table Booking">
                          Table Booking
                        </option>

                        <option value="Order Issue">
                          Order Issue
                        </option>

                        <option value="Feedback">
                          Feedback
                        </option>

                        <option value="Partnership">
                          Partnership
                        </option>

                        <option value="Catering">
                          Catering
                        </option>
                      </select>
                    </div>

                  </div>

                  <div className="vcontact-field">
                    <label htmlFor="contact-message">
                      Your Message
                    </label>

                    <textarea
                      id="contact-message"
                      rows="7"
                      placeholder="Write your message..."
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="vcontact-send"
                  >
                    Send Message
                  </button>

                </form>

              </div>

              {/* FAQ */}

              <div className="vcontact-faq">

                <p className="vcontact-kicker">
                  FAQ
                </p>

                <h2>
                  Frequently asked questions
                </h2>

                <div className="vcontact-faq-item">
                  <h3>
                    Do you offer home delivery?
                  </h3>

                  <p>
                    Yes. We offer food delivery services
                    across selected locations.
                  </p>
                </div>

                <div className="vcontact-faq-item">
                  <h3>
                    Can I book a hall?
                  </h3>

                  <p>
                    Yes. Our halls are available for
                    weddings, birthdays, parties and
                    corporate events.
                  </p>
                </div>

                <div className="vcontact-faq-item">
                  <h3>
                    Do you provide catering?
                  </h3>

                  <p>
                    Yes. Catering services are available
                    for weddings, celebrations and events.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          MAP
      ===================================================== */}

      <section className="vcontact-map-section">

        <div className="vcontact-container">

          <div className="vcontact-map-heading">
            <p className="vcontact-kicker">
              Find us
            </p>

            <h2>
              Visit Varshney's Group
            </h2>
          </div>

          <div className="vcontact-map">
            <iframe
              title="Varshney's Group Delhi Location"
              src="https://maps.google.com/maps?q=delhi&t=&z=13&ie=UTF8&iwloc=&output=embed"
              loading="lazy"
            ></iframe>
          </div>

        </div>

      </section>

      {/* =====================================================
          BRANCHES
      ===================================================== */}

      <section className="vcontact-branches">

        <div className="vcontact-container">

          <div className="vcontact-branches-heading">
            <p className="vcontact-kicker">
              Our presence
            </p>

            <h2>
              Our Branches
            </h2>
          </div>

          <div className="vcontact-branches-grid">

            <div className="vcontact-branch">
              <span>01</span>
              <h3>Delhi</h3>
              <p>Main Branch</p>
            </div>

            <div className="vcontact-branch">
              <span>02</span>
              <h3>Noida</h3>
              <p>Sector 18</p>
            </div>

            <div className="vcontact-branch">
              <span>03</span>
              <h3>Gurgaon</h3>
              <p>Cyber City</p>
            </div>

            <div className="vcontact-branch">
              <span>04</span>
              <h3>Agra</h3>
              <p>Taj Road</p>
            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

export default ContactUs;