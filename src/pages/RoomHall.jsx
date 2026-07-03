import React from "react";
import "../Appcss/RoomHall.css";

function RoomHall() {
  return (
    <section className="rooms-page">
      {/* HERO */}
      <div className="hero">
        <h1>Luxury Rooms & Suites</h1>

        <p>
          Experience premium comfort with elegant rooms, modern amenities,
          and exceptional hospitality.
        </p>

        <div className="search-box">
          <input type="text" placeholder="Destination" />

          <input type="date" />

          <input type="date" />

          <input type="number" placeholder="Guests" />

          <button>Check Availability</button>
        </div>
      </div>

      {/* FILTERS */}
      <div className="filters">
        <select>
          <option>Room Type</option>
          <option>Deluxe Room</option>
          <option>Premium Suite</option>
        </select>

        <select>
          <option>Price</option>
          <option>Low to High</option>
          <option>High to Low</option>
        </select>

        <select>
          <option>Amenities</option>
        </select>
      </div>

      {/* ROOMS */}
      <div className="room-list">
        <div className="room-card">
          <img src="/room1.jpg" alt="Deluxe Room" />
          <h3>Deluxe Room</h3>
          <p>₹3,500 / night</p>

          <div className="rating">
            ⭐⭐⭐⭐⭐ (4.8)
          </div>

          <div className="amenities">
            📶 Free WiFi • ❄️ AC • 📺 Smart TV • 🍽 Breakfast
          </div>

          <button>
            View Details
          </button>

          <button className="book">
            Book Now
          </button>
        </div>

        <div className="room-card">
          <img src="/room1.jpg" alt="Deluxe Room" />
          <h3>Deluxe Room</h3>
          <p>₹2,500 / night</p>
         <div className="rating">
            ⭐⭐⭐⭐⭐ (4.8)
          </div>

          <div className="amenities">
            📶 Free WiFi • ❄️ AC • 📺 Smart TV • 🍽 Breakfast
          </div>

          <button>
            View Details
          </button>

          <button className="book">
            Book Now
          </button>
        </div>

        <div className="room-card">
          <img src="/room1.jpg" alt="Deluxe Room" />
          <h3>Deluxe Room</h3>
          <p>₹4,500 / night</p>
          <div className="rating">
            ⭐⭐⭐⭐⭐ (4.8)
          </div>

          <div className="amenities">
            📶 Free WiFi • ❄️ AC • 📺 Smart TV • 🍽 Breakfast
          </div>

          <button>
            View Details
          </button>

          <button className="book">
            Book Now
          </button>
        </div>

        <div className="room-card">
          <img src="/room2.jpg" alt="Premium Suite" />
          <h3>Premium Suite</h3>
          <p>₹7,500 / night</p>
         <div className="rating">
            ⭐⭐⭐⭐⭐ (4.8)
          </div>

          <div className="amenities">
            📶 Free WiFi • ❄️ AC • 📺 Smart TV • 🍽 Breakfast
          </div>

          <button>
            View Details
          </button>

          <button className="book">
            Book Now
          </button>
        </div>
      </div>
{/* TABLE RESERVATION */}

<div className="table-booking">
  <h2>Reserve Your Dining Table</h2>

  <p>
    Book a table in advance and enjoy a memorable dining experience with
    your family and friends.
  </p>

  <form className="table-form">

    <input
      type="text"
      placeholder="Full Name"
      required
    />

    <input
      type="tel"
      placeholder="Phone Number"
      required
    />

    <input
      type="date"
      required
    />

    <input
      type="time"
      required
    />

    <input
      type="number"
      placeholder="Number of Guests"
      min="1"
      required
    />

    <select required>
      <option value="">Select Seating</option>
      <option>Indoor</option>
      <option>Outdoor</option>
      <option>Private Dining</option>
      <option>Family Section</option>
    </select>

    <textarea
      rows="4"
      placeholder="Special Requests (Optional)"
    ></textarea>

    <button
      type="submit"
      className="book"
    >
      Reserve Table
    </button>

  </form>
</div>
      {/* FACILITIES */}
      <div className="facilities">
        <h2>Facilities</h2>

        <div className="icons">
          <span>📶 Free WiFi</span>
          <span>🏊 Pool</span>
          <span>🚗 Parking</span>
          <span>❄️ AC</span>
        </div>
      </div>
    </section>
  );
}

export default RoomHall;