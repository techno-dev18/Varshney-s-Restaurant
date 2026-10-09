import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Css/MyBookings.css";

const API_URL = "http://localhost:5000/api/bookings";

const formatPrice = (amount) =>
`₹${Number(amount || 0).toLocaleString("en-IN")}`;

const formatDate = (date) => {
if (!date) return "Date not available";

const parsedDate = new Date(date);

if (Number.isNaN(parsedDate.getTime())) {
return "Date not available";
}

return parsedDate.toLocaleDateString("en-IN", {
day: "numeric",
month: "long",
year: "numeric",
});
};

const formatTime = (time) => {
if (!time) return "";

const match = time.match(/^(\d{1,2}):(\d{2})$/);

if (!match) return time;

const date = new Date();
date.setHours(Number(match[1]), Number(match[2]), 0, 0);

return date.toLocaleTimeString("en-IN", {
hour: "numeric",
minute: "2-digit",
hour12: true,
});
};

const getRoomName = (booking) =>
booking.room?.name || "Room or hall";

const getBookingType = (booking) =>
booking.bookingType === "hall" ? "Hall reservation" : "Room reservation";

const getImage = (booking) =>
booking.room?.image || "";

function MyBookings() {
const [bookings, setBookings] = useState([]);
const [filter, setFilter] = useState("all");
const [loading, setLoading] = useState(true);
const [cancellingId, setCancellingId] = useState(null);
const [error, setError] = useState("");
const [notice, setNotice] = useState("");

const token = localStorage.getItem("token");

const fetchBookings = useCallback(async () => {
if (!token) {
setBookings([]);
setLoading(false);
return;
}

setLoading(true);
setError("");

try {
  const response = await fetch(`${API_URL}/my`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not load your bookings.");
  }

  setBookings(Array.isArray(data) ? data : []);
} catch (err) {
  setError(err.message || "Something went wrong while loading bookings.");
} finally {
  setLoading(false);
}

}, [token]);

useEffect(() => {
fetchBookings();
}, [fetchBookings]);

const handleCancel = async (booking) => {
const confirmed = window.confirm(
`Are you sure you want to cancel your reservation for ${getRoomName(booking)}?`
);

if (!confirmed) return;

setCancellingId(booking._id);
setError("");
setNotice("");

try {
  const response = await fetch(
    `${API_URL}/${booking._id}/cancel`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not cancel this booking.");
  }

  setBookings((current) =>
    current.map((item) =>
      item._id === booking._id
        ? {
            ...item,
            bookingStatus: "cancelled",
          }
        : item
    )
  );

  setNotice("Your booking has been cancelled successfully.");
} catch (err) {
  setError(err.message || "Could not cancel this booking.");
} finally {
  setCancellingId(null);
}

};

const filteredBookings = bookings.filter((booking) => {
if (filter === "all") return true;
if (filter === "active") {
return ["pending", "confirmed"].includes(booking.bookingStatus);
}

return booking.bookingStatus === filter;

});

if (!token) {
return (
<main className="my-bookings-page">
<section className="bookings-message">
<span className="bookings-eyebrow">YOUR RESERVATIONS</span>
<h1>My Bookings</h1>
<p>Please log in to view and manage your room and hall reservations.</p>
<Link to="/login" className="bookings-primary-link">
Log In
</Link>
</section>
</main>
);
}

return (
<main className="my-bookings-page">
<section className="bookings-hero">
<div>
<span className="bookings-eyebrow">YOUR PERSONAL RESERVATIONS</span>
<h1>My Bookings</h1>
<p>
Keep track of your room stays, celebrations, and special
gatherings with us.
</p>
</div>

    <Link to="/rooms" className="bookings-primary-link">
      Explore Rooms & Halls
    </Link>
  </section>

  <section className="bookings-summary">
    <article className="booking-summary-card">
      <span>Total bookings</span>
      <strong>{bookings.length}</strong>
    </article>

    <article className="booking-summary-card">
      <span>Active bookings</span>
      <strong>
        {
          bookings.filter((booking) =>
            ["pending", "confirmed"].includes(booking.bookingStatus)
          ).length
        }
      </strong>
    </article>

    <article className="booking-summary-card">
      <span>Completed</span>
      <strong>
        {
          bookings.filter(
            (booking) => booking.bookingStatus === "completed"
          ).length
        }
      </strong>
    </article>
  </section>

  <section className="bookings-content">
    <div className="bookings-toolbar">
      <div>
        <h2>Your reservations</h2>
        <p>View your booking details and current status.</p>
      </div>

      <button
        type="button"
        className="bookings-refresh-button"
        onClick={fetchBookings}
        disabled={loading}
      >
        {loading ? "Refreshing..." : "Refresh"}
      </button>
    </div>

    <div className="bookings-filters" aria-label="Filter bookings">
      {[
        { value: "all", label: "All bookings" },
        { value: "active", label: "Active" },
        { value: "completed", label: "Completed" },
        { value: "cancelled", label: "Cancelled" },
      ].map((option) => (
        <button
          key={option.value}
          type="button"
          className={`bookings-filter ${filter === option.value ? "selected" : ""}`}
          onClick={() => setFilter(option.value)}
          aria-pressed={filter === option.value}
        >
          {option.label}
        </button>
      ))}
    </div>

    {error && (
      <div className="bookings-alert bookings-alert-error" role="alert">
        {error}
        <button type="button" onClick={fetchBookings}>
          Try again
        </button>
      </div>
    )}

    {notice && (
      <div className="bookings-alert bookings-alert-success" role="status">
        {notice}
      </div>
    )}

    {loading ? (
      <div className="bookings-message">
        <span className="bookings-loader" />
        <p>Loading your reservations...</p>
      </div>
    ) : filteredBookings.length === 0 ? (
      <div className="bookings-message">
        <div className="bookings-empty-symbol">◇</div>
        <h3>
          {bookings.length === 0
            ? "No bookings yet"
            : "No bookings in this category"}
        </h3>
        <p>
          {bookings.length === 0
            ? "Your room and hall reservations will appear here after you make a booking."
            : "Try another filter to see your reservations."}
        </p>

        {bookings.length === 0 && (
          <Link to="/rooms" className="bookings-primary-link">
            Browse Rooms & Halls
          </Link>
        )}
      </div>
    ) : (
      <div className="bookings-list">
        {filteredBookings.map((booking) => {
          const status = booking.bookingStatus || "pending";
          const canCancel = ["pending", "confirmed"].includes(status);
          const image = getImage(booking);

          return (
            <article className="booking-card" key={booking._id}>
              <div className="booking-card-image">
                {image ? (
                  <img src={image} alt={getRoomName(booking)} />
                ) : (
                  <div className="booking-image-placeholder">
                    {booking.bookingType === "hall" ? "HALL" : "ROOM"}
                  </div>
                )}
              </div>

              <div className="booking-card-main">
                <div className="booking-card-heading">
                  <div>
                    <span className="booking-type">
                      {getBookingType(booking)}
                    </span>
                    <h3>{getRoomName(booking)}</h3>
                    <span className="booking-reference">
                      Booking ID: {booking._id?.slice(-8).toUpperCase()}
                    </span>
                  </div>

                  <span className={`booking-status status-${status}`}>
                    {status.replaceAll("-", " ")}
                  </span>
                </div>

                <div className="booking-details-grid">
                  <div className="booking-detail">
                    <span>Date</span>
                    <strong>{formatDate(booking.date)}</strong>
                  </div>

                  <div className="booking-detail">
                    <span>Time</span>
                    <strong>
                      {formatTime(booking.startTime)} –{" "}
                      {formatTime(booking.endTime)}
                    </strong>
                  </div>

                  <div className="booking-detail">
                    <span>Guests</span>
                    <strong>{booking.guests ?? "—"}</strong>
                  </div>

                  <div className="booking-detail">
                    <span>Payment status</span>
                    <strong className={`payment-status payment-${booking.paymentStatus || "pending"}`}>
                      {(booking.paymentStatus || "pending").replaceAll("-", " ")}
                    </strong>
                  </div>
                </div>

                {booking.specialRequest && (
                  <div className="booking-special-request">
                    <span>Special request</span>
                    <p>{booking.specialRequest}</p>
                  </div>
                )}

                <div className="booking-card-footer">
                  <div>
                    <span>Total booking amount</span>
                    <strong>{formatPrice(booking.totalAmount)}</strong>
                  </div>
<Link
  to={`/bookings/${booking._id}`}
  className="booking-details-link"
>
  View Details
</Link>
                  {canCancel && (
                    <button
                      type="button"
                      className="booking-cancel-button"
                      onClick={() => handleCancel(booking)}
                      disabled={cancellingId === booking._id}
                    >
                      {cancellingId === booking._id
                        ? "Cancelling..."
                        : "Cancel booking"}
                    </button>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    )}
  </section>
</main>

);
}

export default MyBookings;