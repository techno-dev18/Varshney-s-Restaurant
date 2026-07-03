import React from "react";
import "../Appcss/Home.css";

function Home() {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="home-container">
      {/* <div className="logo">
        <h1>VARSHNEY'S GROUP RESTAURANT</h1>
      </div> */}

      <div className="tagline">
        <h2>"Serving Happiness, One Meal at a Time!"</h2>
        <h2>"Where Every Meal Becomes a Celebration"</h2>
        <h2>A World Full of Taste</h2>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search for cuisines or a dish"
        />
        <button className="btn">Search</button>
      </div>

      <div className="action-buttons">
        <button
          className="btn"
          onClick={() => scrollToSection("services")}
        >
          Book Now
        </button>

        <button
          className="btn"
          onClick={() => scrollToSection("cuisines")}
        >
          Order Food
        </button>
      </div>

      <section className="about-section">
        <p className="para">
          Welcome to Varshney’s Group of Restaurants, where every meal is
          crafted to create unforgettable experiences. From delicious
          starters to mouth-watering main courses and heavenly desserts,
          we bring together a wide variety of cuisines under one roof.

          Our elegant halls and beautifully designed rooms provide the
          perfect setting for parties, celebrations, and special
          functions with facilities suited for every occasion.

          Whether you are planning a family dinner, a grand celebration,
          or a corporate event, we offer the perfect blend of great food,
          comfortable spaces, and warm hospitality.

          With our door-to-door delivery service connecting restaurants
          affiliated with our brand across major parts of India, your
          favorite flavors are always within reach.

          At Varshney’s, every visit is more than just dining — it’s a
          celebration of taste, tradition, and togetherness.
        </p>
      </section>

      

      <section id="services" className="feature-section">
  <h3>Featured Services</h3>

  <p>
    Everything you need for a memorable dining experience.
  </p>

  <div className="feature-grid">

    <div className="feature-card">
      <h4>🍽 Fine Dining</h4>
      <p>
        Experience delicious multi-cuisine meals with premium hospitality.
      </p>
    </div>

    <div className="feature-card">
      <h4>🎉 Party Halls</h4>
      <p>
        Spacious banquet halls for weddings, birthdays and corporate events.
      </p>
    </div>

    <div className="feature-card">
      <h4>🏨 Luxury Rooms</h4>
      <p>
        Comfortable rooms equipped with modern amenities.
      </p>
    </div>

    <div className="feature-card">
      <h4>🚚 Food Delivery</h4>
      <p>
        Get your favorite meals delivered to your doorstep.
      </p>
    </div>

  </div>
</section>

<section id="cuisines" className="feature-section">

<h3>Featured Cuisines</h3>

<p>
Taste authentic flavors from around the world.
</p>

<div className="feature-grid">

<div className="feature-card">
<h4>🍛 Indian</h4>
<p>Traditional North & South Indian specialties.</p>
</div>

<div className="feature-card">
<h4>🍜 Chinese</h4>
<p>Fresh noodles, fried rice and Manchurian.</p>
</div>

<div className="feature-card">
<h4>🍕 Italian</h4>
<p>Wood-fired pizzas and creamy pasta dishes.</p>
</div>

<div className="feature-card">
<h4>🍰 Desserts</h4>
<p>Cakes, brownies, ice creams and sweets.</p>
</div>

</div>

</section>
    </div>
  );
}

export default Home;