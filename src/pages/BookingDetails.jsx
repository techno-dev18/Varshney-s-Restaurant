import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../Css/BookingDetails.css";

const API_URL = "http://localhost:5000/api/bookings";

const formatPrice = (amount) =>
`₹${Number(amount || 0).toLocaleString("en-IN")}`;

const formatDate = (date) => {
if (!date) return "Not available";

const parsedDate = new Date(date);

if (Number.isNaN(parsedDate.getTime())) {
return "Not available";
}

return parsedDate.toLocaleDateString("en-IN", {
day: "numeric",
month: "long",
year: "numeric",
});
};

const formatTime = (time) => {
if (!time) return "Not available";

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

function BookingDetails() {
const { id } = useParams();

const [booking, setBooking] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
const [cancelling, setCancelling] = useState(false);
const [notice, setNotice] = useState("");

const token = localStorage.getItem("token");

const fetchBooking = useCallback(async () => {
if (!token) {
setError("Please log in to view this booking.");
setLoading(false);
return;
}


setLoading(true);
setError("");

try {
  const response = await fetch(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not load booking details.");
  }

  setBooking(data);
} catch (err) {
  setError(err.message || "Something went wrong.");
} finally {
  setLoading(false);
}


}, [id, token]);

useEffect(() => {
fetchBooking();
}, [fetchBooking]);

const handleCancel = async () => {
if (!booking) return;


const confirmed = window.confirm(
  "Are you sure you want to cancel this reservation?"
);

if (!confirmed) return;

setCancelling(true);
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
    throw new Error(data.message || "Unable to cancel this booking.");
  }

  setBooking((current) => ({
    ...current,
    bookingStatus: data.booking?.bookingStatus || "cancelled",
  }));

  setNotice("Your reservation has been cancelled.");
} catch (err) {
  setError(err.message || "Unable to cancel this booking.");
} finally {
  setCancelling(false);
}
};

if (loading) {
return ( <main className="booking-details-page"> <div className="booking-details-message"> <span className="booking-details-loader" /> <p>Loading your reservation...</p> </div> </main>
);
}

if (error && !booking) {
return ( <main className="booking-details-page"> <div className="booking-details-message"> <span className="booking-details-eyebrow">RESERVATION DETAILS</span> <h1>Unable to open booking</h1> <p>{error}</p>
{!token ? ( <Link to="/login" className="booking-details-primary">
Log In </Link>
) : ( <button
           type="button"
           className="booking-details-primary"
           onClick={fetchBooking}
         >
Try Again </button>
)} <Link to="/bookings" className="booking-details-back">
Back to My Bookings </Link> </div> </main>
);
}

const room = booking?.room;
const status = booking?.bookingStatus || "pending";
const amenities = Array.isArray(room?.amenities) ? room.amenities : [];
const canCancel = ["pending", "confirmed"].includes(status);

return ( <main className="booking-details-page"> <div className="booking-details-container"> <Link to="/bookings" className="booking-details-back">
← Back to My Bookings </Link>

```
    <header className="booking-details-header">
      <div>
        <span className="booking-details-eyebrow">
          YOUR RESERVATION
        </span>
        <h1>Booking Details</h1>
        <p>Review the information for your reservation.</p>
      </div>

      <span className={`booking-details-status status-${status}`}>
        {status.replaceAll("-", " ")}
      </span>
    </header>

    {error && (
      <div className="booking-details-alert error" role="alert">
        {error}
      </div>
    )}

    {notice && (
      <div className="booking-details-alert success" role="status">
        {notice}
      </div>
    )}

    <section className="booking-details-card">
      <div className="booking-details-image">
        {room?.image ? (
          <img
            src={room.image}
            alt={room.name || "Reserved room or hall"}
          />
        ) : (
          <div className="booking-details-image-placeholder">
            {booking.bookingType === "hall" ? "EVENT HALL" : "ROOM"}
          </div>
        )}
      </div>

      <div className="booking-details-main">
        <span className="booking-details-type">
          {booking.bookingType === "hall"
            ? "HALL RESERVATION"
            : "ROOM RESERVATION"}
        </span>

        <h2>{room?.name || "Room or hall"}</h2>

        <p className="booking-details-reference">
          Booking ID: {booking._id?.toUpperCase()}
        </p>

        {room?.type && (
          <p className="booking-details-room-type">
            Category: {room.type}
          </p>
        )}

        <div className="booking-details-price">
          <span>Total booking amount</span>
          <strong>{formatPrice(booking.totalAmount)}</strong>
        </div>
      </div>
    </section>

    <div className="booking-details-grid">
      <section className="booking-details-panel">
        <h3>Reservation information</h3>

        <div className="booking-details-row">
          <span>Date</span>
          <strong>{formatDate(booking.date)}</strong>
        </div>

        <div className="booking-details-row">
          <span>Start time</span>
          <strong>{formatTime(booking.startTime)}</strong>
        </div>

        <div className="booking-details-row">
          <span>End time</span>
          <strong>{formatTime(booking.endTime)}</strong>
        </div>

        <div className="booking-details-row">
          <span>Number of guests</span>
          <strong>{booking.guests ?? "Not specified"}</strong>
        </div>

        {room?.capacity != null && (
          <div className="booking-details-row">
            <span>Maximum capacity</span>
            <strong>{room.capacity} guests</strong>
          </div>
        )}
      </section>

      <section className="booking-details-panel">
        <h3>Booking and payment status</h3>

        <div className="booking-details-row">
          <span>Reservation status</span>
          <strong className={`booking-text-status status-text-${status}`}>
            {status}
          </strong>
        </div>

        <div className="booking-details-row">
          <span>Payment status</span>
          <strong
            className={`booking-text-status status-text-${booking.paymentStatus || "pending"}`}
          >
            {booking.paymentStatus || "pending"}
          </strong>
        </div>

        <div className="booking-details-row">
          <span>Booked on</span>
          <strong>{formatDate(booking.createdAt)}</strong>
        </div>

        <div className="booking-details-row">
          <span>Last updated</span>
          <strong>{formatDate(booking.updatedAt)}</strong>
        </div>
      </section>
    </div>

    {amenities.length > 0 && (
      <section className="booking-details-panel booking-amenities">
        <h3>Available amenities</h3>
        <div className="booking-amenities-list">
          {amenities.map((amenity, index) => (
            <span key={`${amenity}-${index}`}>
              {typeof amenity === "string"
                ? amenity
                : amenity.name || "Amenity"}
            </span>
          ))}
        </div>
      </section>
    )}

    <section className="booking-details-panel booking-request">
      <h3>Special requests</h3>
      <p>
        {booking.specialRequest?.trim() ||
          "No special requests were added to this reservation."}
      </p>
    </section>

    <div className="booking-details-actions">
      <Link to="/bookings" className="booking-details-secondary">
        All My Bookings
      </Link>

      {canCancel && (
        <button
          type="button"
          className="booking-details-cancel"
          onClick={handleCancel}
          disabled={cancelling}
        >
          {cancelling ? "Cancelling..." : "Cancel Reservation"}
        </button>
      )}
    </div>
  </div>
</main>


);
}

export default BookingDetails;
