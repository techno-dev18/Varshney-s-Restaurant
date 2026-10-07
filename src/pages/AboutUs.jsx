import React from "react";
import "../Css/AboutUs.css";

const VALUES = [
  {
    number: "01",
    title: "Quality First",
    text: "Fresh ingredients, careful preparation and high standards in everything we serve.",
  },
  {
    number: "02",
    title: "Customer Satisfaction",
    text: "Every guest matters to us, and we aim to make every visit comfortable and memorable.",
  },
  {
    number: "03",
    title: "Innovation",
    text: "We continuously improve our menu, services and hospitality experience.",
  },
  {
    number: "04",
    title: "Hospitality",
    text: "Warm, respectful and attentive service is at the heart of our experience.",
  },
  {
    number: "05",
    title: "Integrity",
    text: "We believe in honest pricing, transparent service and building lasting trust.",
  },
];

const SERVICES = [
  "Multi-Cuisine Restaurant",
  "Party Halls & Events",
  "Rooms & Accommodation",
  "Food Delivery",
  "Catering Services",
];

const JOURNEY = [
  {
    year: "2018",
    title: "The Beginning",
    text: "Our first restaurant was launched with a simple vision of bringing people together through food and hospitality.",
  },
  {
    year: "2019",
    title: "Growing the Experience",
    text: "Our menu and services expanded to offer guests a wider variety of dining experiences.",
  },
  {
    year: "2020",
    title: "Events & Celebrations",
    text: "Event halls were introduced to create dedicated spaces for celebrations and special occasions.",
  },
  {
    year: "2021",
    title: "Catering",
    text: "Catering services were introduced for weddings, parties, corporate events and celebrations.",
  },
  {
    year: "2023",
    title: "Delivery",
    text: "Our delivery network expanded, making our food accessible beyond the restaurant.",
  },
  {
    year: "2025",
    title: "Expanding the Brand",
    text: "The Varshney's Group vision continued to grow across multiple cities and hospitality services.",
  },
];

const WHY_CHOOSE_US = [
  "Wide variety of cuisines",
  "Premium quality food",
  "Hygienic environment",
  "Professional staff",
  "Family-friendly dining",
  "Elegant spaces for events",
];

const ACHIEVEMENTS = [
  "Best Multi-Cuisine Restaurant Award",
  "Excellence in Hospitality",
  "Top Event Venue Recognition",
  "Customer Choice Award",
];

function AboutUs() {
  return (
    <main className="vabout">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="vabout-hero">
        <div className="vabout-hero-content">

          <p className="vabout-eyebrow">
            Varshney's Group
          </p>

          <h1>About Us</h1>

          <span className="vabout-rule"></span>

          <p>
            Food, hospitality and celebrations brought
            together under one roof.
          </p>

        </div>
      </section>

      {/* =====================================================
          INTRO
      ===================================================== */}

      <section className="vabout-section">

        <div className="vabout-container">

          <div className="vabout-intro">

            <div>
              <p className="vabout-kicker">
                Our story
              </p>

              <h2>
                Where food meets celebration
              </h2>
            </div>

            <div className="vabout-intro-text">

              <p>
                Welcome to{" "}
                <strong>
                  Varshney's Group of Restaurants
                </strong>
                — where food meets celebration, and every
                dining experience becomes a memory worth
                cherishing.
              </p>

              <p>
                Founded with a passion for hospitality,
                Varshney's began with a simple idea:
                create places where people can come together,
                enjoy delicious food and celebrate life's
                important moments.
              </p>

            </div>

          </div>

          <div className="vabout-story">

            <p>
              Over the years, our vision has grown into a
              complete hospitality brand offering
              multi-cuisine dining, elegant event halls,
              comfortable rooms, catering services and
              food delivery.
            </p>

            <p>
              While our services continue to evolve, our
              purpose remains the same — to combine quality
              food with thoughtful hospitality and create
              experiences that people remember.
            </p>

          </div>

        </div>

      </section>

      {/* =====================================================
          VALUES
      ===================================================== */}

      <section className="vabout-section vabout-section--white">

        <div className="vabout-container">

          <div className="vabout-heading">

            <p className="vabout-kicker">
              What guides us
            </p>

            <h2>
              Our Core Values
            </h2>

          </div>

          <div className="vabout-values">

            {VALUES.map((value) => (
              <article
                className="vabout-value"
                key={value.number}
              >

                <span className="vabout-number">
                  {value.number}
                </span>

                <h3>
                  {value.title}
                </h3>

                <p>
                  {value.text}
                </p>

              </article>
            ))}

          </div>

        </div>

      </section>

      {/* =====================================================
          WHAT WE OFFER
      ===================================================== */}

      <section className="vabout-section">

        <div className="vabout-container">

          <div className="vabout-offer">

            <div>
              <p className="vabout-kicker">
                Our services
              </p>

              <h2>
                More than a restaurant
              </h2>

              <p className="vabout-offer-text">
                Varshney's Group brings dining,
                accommodation and celebrations together
                to provide a complete hospitality
                experience.
              </p>
            </div>

            <div className="vabout-services">

              {SERVICES.map((service, index) => (
                <div
                  className="vabout-service"
                  key={service}
                >

                  <span>
                    0{index + 1}
                  </span>

                  <h3>
                    {service}
                  </h3>

                </div>
              ))}

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          FOUNDER MESSAGE
      ===================================================== */}

      <section className="vabout-founder">

        <div className="vabout-founder-inner">

          <p className="vabout-kicker vabout-kicker--gold">
            Founder's message
          </p>

          <blockquote>
            "Our goal was never just to serve food—it was
            to create experiences that bring families,
            friends, and communities together. Every meal
            should leave a lasting memory."
          </blockquote>

          <span className="vabout-founder-name">
            Founder, Varshney's Group
          </span>

        </div>

      </section>

      {/* =====================================================
          VISION & MISSION
      ===================================================== */}

      <section className="vabout-section vabout-section--white">

        <div className="vabout-container">

          <div className="vabout-vision-grid">

            <div className="vabout-vision-card">

              <span className="vabout-vision-number">
                01
              </span>

              <p className="vabout-kicker">
                Our vision
              </p>

              <h2>
                Building a trusted hospitality brand
              </h2>

              <p>
                To become one of India's most trusted
                hospitality brands through exceptional
                dining, thoughtful service and premium
                experiences.
              </p>

            </div>

            <div className="vabout-vision-card">

              <span className="vabout-vision-number">
                02
              </span>

              <p className="vabout-kicker">
                Our mission
              </p>

              <h2>
                Creating experiences that matter
              </h2>

              <ul>
                <li>
                  Deliver high-quality food consistently.
                </li>

                <li>
                  Create memorable customer experiences.
                </li>

                <li>
                  Expand our hospitality presence across India.
                </li>

                <li>
                  Use technology to improve our services.
                </li>
              </ul>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          JOURNEY
      ===================================================== */}

      <section className="vabout-section">

        <div className="vabout-container">

          <div className="vabout-heading">

            <p className="vabout-kicker">
              Our journey
            </p>

            <h2>
              Growing with every chapter
            </h2>

          </div>

          <div className="vabout-timeline">

            {JOURNEY.map((item) => (
              <article
                className="vabout-timeline-item"
                key={item.year}
              >

                <div className="vabout-timeline-year">
                  {item.year}
                </div>

                <div className="vabout-timeline-content">

                  <h3>
                    {item.title}
                  </h3>

                  <p>
                    {item.text}
                  </p>

                </div>

              </article>
            ))}

          </div>

        </div>

      </section>

      {/* =====================================================
          TEAM
      ===================================================== */}

      <section className="vabout-section vabout-section--dark">

        <div className="vabout-container vabout-team">

          <div>
            <p className="vabout-kicker vabout-kicker--gold">
              Our people
            </p>

            <h2>
              The team behind the experience
            </h2>
          </div>

          <p>
            Our chefs, hospitality experts and service
            professionals work together to deliver an
            exceptional experience to every guest.
            From the kitchen to the dining floor, every
            member of our team plays an important role
            in creating the Varshney's experience.
          </p>

        </div>

      </section>

      {/* =====================================================
          WHY CHOOSE US
      ===================================================== */}

      <section className="vabout-section vabout-section--white">

        <div className="vabout-container">

          <div className="vabout-heading">

            <p className="vabout-kicker">
              The Varshney's difference
            </p>

            <h2>
              Why choose us?
            </h2>

          </div>

          <div className="vabout-why">

            {WHY_CHOOSE_US.map((item, index) => (
              <div
                className="vabout-why-item"
                key={item}
              >

                <span>
                  0{index + 1}
                </span>

                <p>
                  {item}
                </p>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* =====================================================
          CUSTOMER EXPERIENCE
      ===================================================== */}

      <section className="vabout-experience">

        <div className="vabout-experience-inner">

          <p className="vabout-kicker vabout-kicker--gold">
            Our promise
          </p>

          <h2>
            Every detail matters
          </h2>

          <p>
            We focus on delivering not just food, but a
            complete experience. From the quality of the
            ingredients to the atmosphere, service and
            comfort of our guests, every detail matters.
          </p>

        </div>

      </section>

      {/* =====================================================
          ACHIEVEMENTS
      ===================================================== */}

      <section className="vabout-section">

        <div className="vabout-container">

          <div className="vabout-heading">

            <p className="vabout-kicker">
              Recognition
            </p>

            <h2>
              Our achievements
            </h2>

          </div>

          <div className="vabout-achievements">

            {ACHIEVEMENTS.map((achievement, index) => (
              <div
                className="vabout-achievement"
                key={achievement}
              >

                <span>
                  0{index + 1}
                </span>

                <h3>
                  {achievement}
                </h3>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* =====================================================
          FUTURE
      ===================================================== */}

      <section className="vabout-future">

        <div className="vabout-future-inner">

          <p className="vabout-kicker vabout-kicker--gold">
            Looking ahead
          </p>

          <h2>
            Our future
          </h2>

          <p>
            We aim to expand nationwide and create premium
            dining experiences that combine tradition with
            innovation while staying true to the values
            that shaped Varshney's Group.
          </p>

        </div>

      </section>

    </main>
  );
}

export default AboutUs;