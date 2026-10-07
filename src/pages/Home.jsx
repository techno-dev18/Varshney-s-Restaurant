import React from "react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import "../Css/Landing.css";

const SERVICES = [
  {
    title: "Dining",
    text: "Multi-cuisine meals served with warm, attentive hospitality.",
    to: "/food-menu",
    cta: "View the menu",
  },
  {
    title: "Halls & Functions",
    text: "Spacious halls for weddings, birthdays, parties and corporate events.",
    to: "/rooms",
    cta: "Explore halls",
  },
  {
    title: "Rooms",
    text: "Comfortable rooms equipped with modern amenities.",
    to: "/rooms",
    cta: "View rooms",
  },
];

const CUISINES = [
  { name: "Indian", text: "Traditional North & South Indian specialties." },
  { name: "Chinese", text: "Fresh noodles, fried rice and Manchurian." },
  { name: "Italian", text: "Wood-fired pizzas and creamy pasta dishes." },
  { name: "Desserts", text: "Cakes, brownies, ice creams and sweets." },
];

function Home() {
  return (
    <main className="vhome">
      {/* HERO */}
      <section className="vhome-hero">
        <div className="vhome-hero-inner">
          <p className="vhome-eyebrow">Varshney's Group</p>
          <h1 className="vhome-title">Where every meal becomes a celebration</h1>
          <span className="vhome-rule" aria-hidden="true" />
          <p className="vhome-lead">
            Multi-cuisine dining, elegant halls and comfortable rooms, all under
            one roof.
          </p>
          <div className="vhome-actions">
            <Link to="/food-menu" className="vhome-btn vhome-btn--primary">
              Explore the menu
            </Link>
            <Link to="/rooms" className="vhome-btn vhome-btn--ghost">
              Rooms &amp; halls
            </Link>
          </div>
        </div>
        <span className="vhome-scroll" aria-hidden="true" />
      </section>

      {/* INTRO */}
      <section className="vhome-section">
        <div className="vhome-container vhome-intro">
          <Reveal>
            <p className="vhome-kicker">Welcome</p>
            <h2 className="vhome-h2">
              A celebration of taste, tradition and togetherness
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="vhome-text">
              Welcome to Varshney's Group of Restaurants, where every meal is
              crafted to create unforgettable experiences. From delicious
              starters to mouth-watering main courses and heavenly desserts, we
              bring together a wide variety of cuisines under one roof.
            </p>
            <p className="vhome-text">
              Our elegant halls and beautifully designed rooms provide the
              perfect setting for parties, celebrations and special functions.
              Whether you are planning a family dinner, a grand celebration or a
              corporate event, we offer great food, comfortable spaces and warm
              hospitality.
            </p>
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section className="vhome-section vhome-section--white">
        <div className="vhome-container">
          <Reveal>
            <p className="vhome-kicker">What we offer</p>
            <h2 className="vhome-h2">Everything for a memorable occasion</h2>
          </Reveal>
          <div className="vhome-cards">
            {SERVICES.map((item, i) => (
              <Reveal key={item.title} delay={i * 120}>
                <Link to={item.to} className="vhome-card">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <span className="vhome-card-cta">{item.cta} →</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CUISINES */}
      <section className="vhome-section vhome-section--dark">
        <div className="vhome-container">
          <Reveal>
            <p className="vhome-kicker vhome-kicker--gold">The kitchen</p>
            <h2 className="vhome-h2 vhome-h2--light">
              Flavours from around the world
            </h2>
          </Reveal>
          <div className="vhome-cuisines">
            {CUISINES.map((c, i) => (
              <Reveal key={c.name} delay={i * 120}>
                <div className="vhome-cuisine">
                  <span className="vhome-num">0{i + 1}</span>
                  <h3>{c.name}</h3>
                  <p>{c.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <Link to="/foodmenu" className="vhome-btn vhome-btn--primary">
              See the full menu
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

export default Home;