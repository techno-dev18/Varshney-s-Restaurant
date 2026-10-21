import { useEffect, useMemo, useState } from "react";
import "../Css/RoomHall.css";

const API_URL = "https://varshneys-restaurant-api.onrender.com/api";

function getToday() {
  // Use the Indian calendar date for booking validation.
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function getRoomList(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.rooms)) return data.rooms;
  if (Array.isArray(data.data)) return data.data;
  if (Array.isArray(data.data?.rooms)) return data.data.rooms;
  return [];
}

function getBookingType(room) {
  return String(room.type || "").toLowerCase() === "hall" ||
    String(room.category || "").toLowerCase() === "hall"
    ? "hall"
    : "room";
}

function RoomHall() {
  const [roomType, setRoomType] = useState("All");
  const [price, setPrice] = useState("All");
  const [amenity, setAmenity] = useState("All");

  const [rooms, setRooms] = useState([]);
  const [loadingRooms, setLoadingRooms] = useState(true);
  const [roomsError, setRoomsError] = useState("");

  const [selectedRoom, setSelectedRoom] = useState(null);

  const [bookingForm, setBookingForm] = useState({
    date: getToday(),
    startTime: "14:00",
    endTime: "15:00",
    guests: "2",
    specialRequest: "",
  });

  const [bookingMessage, setBookingMessage] = useState("");
  const [bookingError, setBookingError] = useState("");
  const [submittingBooking, setSubmittingBooking] = useState(false);

  // Fetch rooms and halls from MongoDB through the backend API.
  const loadRooms = async () => {
    setLoadingRooms(true);
    setRoomsError("");

    try {
      const response = await fetch(`${API_URL}/rooms`);
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message || "Could not load rooms and halls."
        );
      }

      const backendRooms = getRoomList(data);

      setRooms(backendRooms);

      if (backendRooms.length === 0) {
        setRoomsError("No rooms or halls were found in the database.");
      }
    } catch (error) {
      setRooms([]);
      setRoomsError(
        error.message ||
          "Could not connect to the rooms API. Please try again."
      );
    } finally {
      setLoadingRooms(false);
    }
  };

  useEffect(() => {
    loadRooms();
  }, []);

  // Filter the database records.
  const filteredRooms = useMemo(() => {
    return rooms.filter((room) => {
      const category =
        String(room.category || "").toLowerCase() === "hall" ||
        String(room.type || "").toLowerCase() === "hall"
          ? "Hall"
          : room.type;

      const typeMatch = roomType === "All" || category === roomType;

      const amenities = Array.isArray(room.amenities)
        ? room.amenities
        : [];

      const normalizedAmenities = amenities.map((item) =>
        String(item).toLowerCase().trim()
      );

      const amenityMatch =
        amenity === "All" ||
        normalizedAmenities.includes(amenity.toLowerCase());

      const roomPrice = Number(room.price || 0);

      let priceMatch = true;

      if (price === "Low") {
        priceMatch = roomPrice < 4000;
      } else if (price === "Medium") {
        priceMatch = roomPrice >= 4000 && roomPrice <= 10000;
      } else if (price === "High") {
        priceMatch = roomPrice > 10000;
      }

      return typeMatch && priceMatch && amenityMatch;
    });
  }, [rooms, roomType, price, amenity]);

  const clearFilters = () => {
    setRoomType("All");
    setPrice("All");
    setAmenity("All");
  };

  const handleViewDetails = (room) => {
    const amenities = Array.isArray(room.amenities)
      ? room.amenities
      : [];

    const priceLabel = Number(room.price || 0).toLocaleString("en-IN");

    const priceUnit =
      getBookingType(room) === "hall" ? " / event" : " / night";

    alert(
      `${room.name}\n\n` +
        `Price: ₹${priceLabel}${priceUnit}\n` +
        `Rating: ${room.rating || "Not provided"}\n` +
        `Capacity: ${room.capacity || "Not specified"} guests\n\n` +
        `Amenities:\n${amenities.join(", ") || "Not listed"}`
    );
  };

  const handleBooking = (room) => {
    setSelectedRoom(room);

    setBookingForm({
      date: getToday(),
      startTime: "14:00",
      endTime: "15:00",
      guests: "2",
      specialRequest: "",
    });

    setBookingMessage("");
    setBookingError("");
  };

  const closeBooking = () => {
    if (submittingBooking) return;

    setSelectedRoom(null);
    setBookingMessage("");
    setBookingError("");
  };

  const updateBookingField = (event) => {
    const { name, value } = event.target;

    setBookingForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const submitBooking = async (event) => {
    event.preventDefault();

    setBookingMessage("");
    setBookingError("");

    const token = localStorage.getItem("token");

    if (!token) {
      setBookingError("Please log in before booking a room or hall.");
      return;
    }

    if (!selectedRoom?._id) {
      setBookingError(
        "This space does not have a valid database ID. Please refresh the page and try again."
      );
      return;
    }

    const today = getToday();

    if (bookingForm.date < today) {
      setBookingError("Please choose today or a future date.");
      return;
    }

    if (bookingForm.date === today) {
      const currentTime = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
      }).format(new Date());

      if (bookingForm.startTime <= currentTime) {
        setBookingError(
          "For bookings today, choose a start time later than the current time in India."
        );
        return;
      }
    }

    if (bookingForm.endTime <= bookingForm.startTime) {
      setBookingError("End time must be later than start time.");
      return;
    }

    const guests = Number(bookingForm.guests);

    if (!Number.isInteger(guests) || guests < 1 || guests > 1000) {
      setBookingError("Enter a whole number of guests between 1 and 1000.");
      return;
    }

    if (
      selectedRoom.capacity != null &&
      guests > Number(selectedRoom.capacity)
    ) {
      setBookingError(
        `This space can accommodate a maximum of ${selectedRoom.capacity} guests.`
      );
      return;
    }

    setSubmittingBooking(true);

    try {
      const response = await fetch(`${API_URL}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          room: selectedRoom._id,
          bookingType: getBookingType(selectedRoom),
          date: bookingForm.date,
          startTime: bookingForm.startTime,
          endTime: bookingForm.endTime,
          guests,
          specialRequest: bookingForm.specialRequest.trim(),
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message ||
            data.error ||
            `Booking failed with status ${response.status}.`
        );
      }

      setBookingMessage(
        `Booking request submitted successfully${
          data.booking?._id
            ? ` (Reference: ${data.booking._id})`
            : ""
        }. Please wait for confirmation.`
      );
    } catch (error) {
      setBookingError(
        error.message ||
          "Could not submit the booking. Please check your connection."
      );
    } finally {
      setSubmittingBooking(false);
    }
  };

  return (
    <div className="rooms-page">
      {/* Hero */}
      <section className="room-hero">
        <div className="room-hero-content">
          <h1>Rooms &amp; Halls</h1>
          <p>
            Comfortable rooms and elegant spaces for every occasion.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="room-filters">
        <div className="filter-header">
          <div>
            <h2>Find Your Perfect Space</h2>
            <p>
              Choose a room or hall according to your requirements.
            </p>
          </div>

          <button
            className="clear-filter-btn"
            onClick={clearFilters}
            type="button"
          >
            Clear Filters
          </button>
        </div>

        <div className="filters">
          <div className="filter-group">
            <label htmlFor="roomType">Type</label>
            <select
              id="roomType"
              value={roomType}
              onChange={(event) => setRoomType(event.target.value)}
            >
              <option value="All">All Types</option>
              <option value="Budget">Budget</option>
              <option value="Deluxe">Deluxe</option>
              <option value="Executive">Executive</option>
              <option value="Premium">Premium</option>
              <option value="Suite">Suite</option>
              <option value="Hall">Hall</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="price">Price</label>
            <select
              id="price"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            >
              <option value="All">All Prices</option>
              <option value="Low">Below ₹4000</option>
              <option value="Medium">₹4000 - ₹10000</option>
              <option value="High">Above ₹10000</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="amenity">Amenity</label>
            <select
              id="amenity"
              value={amenity}
              onChange={(event) => setAmenity(event.target.value)}
            >
              <option value="All">All Amenities</option>
              <option value="Free WiFi">Free WiFi</option>
              <option value="WiFi">WiFi</option>
              <option value="AC">AC</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Pool">Pool</option>
              <option value="Projector">Projector</option>
              <option value="Parking">Parking</option>
            </select>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="rooms-section">
        <div className="rooms-heading">
          <h2>Available Rooms &amp; Halls</h2>
          <p>
            {loadingRooms
              ? "Loading spaces..."
              : `${filteredRooms.length} ${
                  filteredRooms.length === 1 ? "space" : "spaces"
                } listed`}
          </p>
        </div>

        {loadingRooms && (
          <p className="rooms-notice">Loading rooms and halls...</p>
        )}

        {!loadingRooms && roomsError && (
          <div className="rooms-notice" role="alert">
            <p>{roomsError}</p>
            <button type="button" onClick={loadRooms}>
              Try Again
            </button>
          </div>
        )}

        {!loadingRooms && !roomsError && (
          <div className="room-list">
            {filteredRooms.length === 0 ? (
              <div className="no-rooms">
                <h3>No rooms or halls found</h3>
                <p>Try changing your filters.</p>
                <button onClick={clearFilters} type="button">
                  Clear Filters
                </button>
              </div>
            ) : (
              filteredRooms.map((room) => {
                const amenities = Array.isArray(room.amenities)
                  ? room.amenities
                  : [];

                const image = room.image || room.imageUrl || "";
                const bookingType = getBookingType(room);

                return (
                  <div className="room-card" key={room._id}>
                    <div className="room-image-wrapper">
                      {image ? (
                        <img src={image} alt={room.name} />
                      ) : (
                        <div className="room-image-placeholder">
                          Image coming soon
                        </div>
                      )}

                      <span className="room-type">
                        {room.type || room.category}
                      </span>
                    </div>

                    <div className="room-card-content">
                      <h3>{room.name}</h3>

                      <div className="room-rating">
                        {room.rating
                          ? `⭐ ${room.rating}`
                          : "Comfortable space"}
                      </div>

                      <p className="room-price">
                        ₹{Number(room.price || 0).toLocaleString("en-IN")}
                        <span>
                          {bookingType === "hall"
                            ? " / event"
                            : " / night"}
                        </span>
                      </p>

                      {room.description && (
                        <p className="room-description">
                          {room.description}
                        </p>
                      )}

                      <div className="amenities">
                        {amenities.map((item, itemIndex) => (
                          <span
                            key={`${item}-${itemIndex}`}
                            className="amenity-tag"
                          >
                            {item}
                          </span>
                        ))}
                      </div>

                      <div className="room-buttons">
                        <button
                          className="details-btn"
                          onClick={() => handleViewDetails(room)}
                          type="button"
                        >
                          View Details
                        </button>

                        <button
                          className="book"
                          onClick={() => handleBooking(room)}
                          type="button"
                          disabled={room.available === false}
                        >
                          {room.available === false
                            ? "Unavailable"
                            : "Book Now"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </section>

      {/* Facilities */}
      <section className="facilities">
        <h2>Our Facilities</h2>
        <p className="facilities-subtitle">
          Everything you need for a comfortable and memorable stay.
        </p>

        <div className="icons">
          <span>📶 Free WiFi</span>
          <span>❄️ Air Conditioning</span>
          <span>🍳 Breakfast</span>
          <span>🏊 Swimming Pool</span>
          <span>🚗 Parking</span>
          <span>📽️ Projector</span>
        </div>
      </section>

      {/* Table booking - frontend only */}
      <section className="table-booking">
        <h2>Book a Table</h2>
        <p>
          Reserve your table at SV&apos;s Restaurant for a memorable
          dining experience.
        </p>

        <p className="table-booking-note">
          Table reservations are separate from room and hall bookings.
          Online table reservation is not connected to the backend yet.
        </p>

        <form
          className="table-form"
          onSubmit={(event) => {
            event.preventDefault();
            alert("Table booking is not connected to the backend yet.");
          }}
        >
          <input type="text" placeholder="Your Name" required />
          <input type="tel" placeholder="Phone Number" required />
          <input type="date" min={getToday()} required />
          <input type="time" required />

          <select required defaultValue="">
            <option value="" disabled>
              Number of Guests
            </option>
            {[1, 2, 3, 4, 5, 6].map((number) => (
              <option value={number} key={number}>
                {number} {number === 1 ? "Guest" : "Guests"}
              </option>
            ))}
            <option value="7+">7+ Guests</option>
          </select>

          <textarea
            placeholder="Special requests (optional)"
            rows="4"
          />

          <button type="submit">Reserve Table</button>
        </form>
      </section>

      {/* Room and hall booking modal */}
      {selectedRoom && (
        <div
          className="booking-overlay"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeBooking();
            }
          }}
        >
          <section
            className="booking-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-title"
          >
            <button
              className="booking-close"
              type="button"
              onClick={closeBooking}
              aria-label="Close booking form"
            >
              ×
            </button>

            <h2 id="booking-title">Book {selectedRoom.name}</h2>

            <p className="booking-modal-price">
              ₹{Number(selectedRoom.price || 0).toLocaleString("en-IN")}
              {getBookingType(selectedRoom) === "hall"
                ? " per event"
                : " per night"}
            </p>

            <form className="booking-form" onSubmit={submitBooking}>
              <label>
                Booking date
                <input
                  type="date"
                  name="date"
                  min={getToday()}
                  value={bookingForm.date}
                  onChange={updateBookingField}
                  required
                />
              </label>

              <div className="booking-time-fields">
                <label>
                  Start time
                  <input
                    type="time"
                    name="startTime"
                    value={bookingForm.startTime}
                    onChange={updateBookingField}
                    required
                  />
                </label>

                <label>
                  End time
                  <input
                    type="time"
                    name="endTime"
                    value={bookingForm.endTime}
                    onChange={updateBookingField}
                    required
                  />
                </label>
              </div>

              <label>
                Number of guests
                <input
                  type="number"
                  name="guests"
                  min="1"
                  max={selectedRoom.capacity || 1000}
                  value={bookingForm.guests}
                  onChange={updateBookingField}
                  required
                />
                {selectedRoom.capacity != null && (
                  <span className="booking-help">
                    Capacity: {selectedRoom.capacity} guests
                  </span>
                )}
              </label>

              <label>
                Special request (optional)
                <textarea
                  name="specialRequest"
                  rows="3"
                  maxLength="1000"
                  value={bookingForm.specialRequest}
                  onChange={updateBookingField}
                  placeholder="Add any requirements..."
                />
              </label>

              {bookingError && (
                <p className="booking-error" role="alert">
                  {bookingError}
                </p>
              )}

              {bookingMessage && (
                <p className="booking-success" role="status">
                  {bookingMessage}
                </p>
              )}

              {!bookingMessage && (
                <button
                  className="booking-submit"
                  type="submit"
                  disabled={submittingBooking}
                >
                  {submittingBooking
                    ? "Submitting..."
                    : "Submit Booking Request"}
                </button>
              )}
            </form>
          </section>
        </div>
      )}
    </div>
  );
}

export default RoomHall;