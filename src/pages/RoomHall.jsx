import React, { useState } from "react";
import "../Css/RoomHall.css";
import RHdata from "../data/RHdata";

function RoomHall() {
  const [roomType, setRoomType] = useState("All");
  const [price, setPrice] = useState("All");
  const [amenity, setAmenity] = useState("All");

  const filteredRooms = RHdata.filter((room) => {
    const typeMatch =
      roomType === "All" ||
      room.type === roomType;

    const amenityMatch =
      amenity === "All" ||
      room.amenities.includes(amenity);

    let priceMatch = true;

    if (price === "Low") {
      priceMatch = room.price < 4000;
    }

    if (price === "Medium") {
      priceMatch =
        room.price >= 4000 &&
        room.price <= 10000;
    }

    if (price === "High") {
      priceMatch = room.price > 10000;
    }

    return (
      typeMatch &&
      priceMatch &&
      amenityMatch
    );
  });

  const clearFilters = () => {
    setRoomType("All");
    setPrice("All");
    setAmenity("All");
  };

  const handleViewDetails = (room) => {
    alert(
      `${room.name}\n\nPrice: ₹${room.price} / night\nRating: ${room.rating}\n\nAmenities:\n${room.amenities.join(", ")}`
    );
  };

  const handleBooking = (room) => {
    alert(
      `Booking request for ${room.name} will be added soon.`
    );
  };

  return (
    <div className="rooms-page">

      {/* ================================
          HERO
      ================================= */}

      <section className="room-hero">

        <div className="room-hero-content">

          <h1>
            Rooms & Halls
          </h1>

          <p>
            Comfortable rooms and elegant spaces
            for every occasion.
          </p>

        </div>

      </section>


      {/* ================================
          FILTERS
      ================================= */}

      <section className="room-filters">

        <div className="filter-header">

          <div>
            <h2>
              Find Your Perfect Space
            </h2>

            <p>
              Choose a room or hall according
              to your requirements.
            </p>
          </div>

          <button
            className="clear-filter-btn"
            onClick={clearFilters}
          >
            Clear Filters
          </button>

        </div>


        <div className="filters">

          {/* Room Type */}

          <div className="filter-group">

            <label htmlFor="roomType">
              Type
            </label>

            <select
              id="roomType"
              value={roomType}
              onChange={(e) =>
                setRoomType(e.target.value)
              }
            >
              <option value="All">
                All Types
              </option>

              <option value="Deluxe">
                Deluxe
              </option>

              <option value="Premium">
                Premium
              </option>

              <option value="Hall">
                Hall
              </option>
            </select>

          </div>


          {/* Price */}

          <div className="filter-group">

            <label htmlFor="price">
              Price
            </label>

            <select
              id="price"
              value={price}
              onChange={(e) =>
                setPrice(e.target.value)
              }
            >
              <option value="All">
                All Prices
              </option>

              <option value="Low">
                Below ₹4000
              </option>

              <option value="Medium">
                ₹4000 - ₹10000
              </option>

              <option value="High">
                Above ₹10000
              </option>

            </select>

          </div>


          {/* Amenities */}

          <div className="filter-group">

            <label htmlFor="amenity">
              Amenity
            </label>

            <select
              id="amenity"
              value={amenity}
              onChange={(e) =>
                setAmenity(e.target.value)
              }
            >
              <option value="All">
                All Amenities
              </option>

              <option value="Free WiFi">
                Free WiFi
              </option>

              <option value="AC">
                AC
              </option>

              <option value="Breakfast">
                Breakfast
              </option>

              <option value="Pool">
                Pool
              </option>

              <option value="Projector">
                Projector
              </option>

              <option value="Parking">
                Parking
              </option>

            </select>

          </div>

        </div>

      </section>


      {/* ================================
          RESULTS
      ================================= */}

      <section className="rooms-section">

        <div className="rooms-heading">

          <h2>
            Available Rooms & Halls
          </h2>

          <p>
            {filteredRooms.length}{" "}
            {filteredRooms.length === 1
              ? "space"
              : "spaces"}{" "}
            available
          </p>

        </div>


        <div className="room-list">

          {filteredRooms.length === 0 ? (

            <div className="no-rooms">

              <h3>
                No rooms or halls found
              </h3>

              <p>
                Try changing your filters.
              </p>

              <button
                onClick={clearFilters}
              >
                Clear Filters
              </button>

            </div>

          ) : (

            filteredRooms.map((room) => (

              <div
                className="room-card"
                key={room.id}
              >

                {/* Image */}

                <div className="room-image-wrapper">

                  <img
                    src={room.image}
                    alt={room.name}
                  />

                  <span className="room-type">
                    {room.type}
                  </span>

                </div>


                {/* Content */}

                <div className="room-card-content">

                  <h3>
                    {room.name}
                  </h3>


                  <div className="room-rating">
                    ⭐ {room.rating}
                  </div>


                  <p className="room-price">
                    ₹{room.price.toLocaleString("en-IN")}
                    <span>
                      {" "}/ night
                    </span>
                  </p>


                  <div className="amenities">

                    {room.amenities.map(
                      (item, index) => (

                        <span
                          key={index}
                          className="amenity-tag"
                        >
                          {item}
                        </span>

                      )
                    )}

                  </div>


                  {/* Buttons */}

                  <div className="room-buttons">

                    <button
                      className="details-btn"
                      onClick={() =>
                        handleViewDetails(room)
                      }
                    >
                      View Details
                    </button>

                    <button
                      className="book"
                      onClick={() =>
                        handleBooking(room)
                      }
                    >
                      Book Now
                    </button>

                  </div>

                </div>

              </div>

            ))

          )}

        </div>

      </section>


      {/* ================================
          FACILITIES
      ================================= */}

      <section className="facilities">

        <h2>
          Our Facilities
        </h2>

        <p className="facilities-subtitle">
          Everything you need for a comfortable
          and memorable stay.
        </p>


        <div className="icons">

          <span>
            📶 Free WiFi
          </span>

          <span>
            ❄️ Air Conditioning
          </span>

          <span>
            🍳 Breakfast
          </span>

          <span>
            🏊 Swimming Pool
          </span>

          <span>
            🚗 Parking
          </span>

          <span>
            📽️ Projector
          </span>

        </div>

      </section>


      {/* ================================
          TABLE BOOKING
      ================================= */}

      <section className="table-booking">

        <h2>
          Book a Table
        </h2>

        <p>
          Reserve your table at SV's Restaurant
          for a memorable dining experience.
        </p>


        <form
          className="table-form"
          onSubmit={(e) => {
            e.preventDefault();

            alert(
              "Table booking feature will be connected to the backend soon."
            );
          }}
        >

          <input
            type="text"
            placeholder="Your Name"
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

          <select required defaultValue="">
            <option value="" disabled>
              Number of Guests
            </option>

            <option value="1">
              1 Guest
            </option>

            <option value="2">
              2 Guests
            </option>

            <option value="3">
              3 Guests
            </option>

            <option value="4">
              4 Guests
            </option>

            <option value="5">
              5 Guests
            </option>

            <option value="6">
              6 Guests
            </option>

            <option value="7+">
              7+ Guests
            </option>

          </select>

          <textarea
            placeholder="Special requests (optional)"
            rows="4"
          />

          <button
            type="submit"
          >
            Reserve Table
          </button>

        </form>

      </section>

    </div>
  );
}

export default RoomHall;