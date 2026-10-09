
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Css/MyOrders.css";

const API_URL = "http://localhost:5000/api/orders";

function formatPrice(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(Number(amount) || 0);
}

function formatDate(date) {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Date unavailable";
  }

  return parsedDate.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [activeOrder, setActiveOrder] = useState("");
  const [filter, setFilter] = useState("all");

  const token = localStorage.getItem("token");

  const fetchOrders = useCallback(async () => {
    if (!token) {
      setError("Please log in to view your orders.");
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
        throw new Error(data.message || "Unable to load your orders.");
      }

      setOrders(Array.isArray(data) ? data : []);
    } catch (requestError) {
      setError(requestError.message || "Failed to load orders.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  async function cancelOrder(orderId) {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (!confirmed) return;

    setActiveOrder(orderId);
    setMessage("");
    setError("");

    try {
      const response = await fetch(`${API_URL}/${orderId}/cancel`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to cancel this order.");
      }

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order._id === orderId ? data.order : order
        )
      );

      setMessage("Your order was cancelled successfully.");
    } catch (requestError) {
      setError(requestError.message || "Failed to cancel the order.");
    } finally {
      setActiveOrder("");
    }
  }

  const filteredOrders = orders.filter((order) => {
    if (filter === "all") return true;
    if (filter === "active") {
      return !["delivered", "cancelled"].includes(order.orderStatus);
    }
    return order.orderStatus === filter;
  });

  if (!token) {
    return (
      <main className="my-orders-page">
        <section className="my-orders-empty">
          <p className="my-orders-eyebrow">YOUR ACCOUNT</p>
          <h1>Your orders, all in one place.</h1>
          <p>Log in to see your order history and track order status.</p>
          <Link to="/login" className="my-orders-primary-button">
            Log In
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="my-orders-page">
      <div className="my-orders-container">
        <header className="my-orders-heading">
          <div>
            <p className="my-orders-eyebrow">YOUR DINING HISTORY</p>
            <h1>My Orders</h1>
            <p>Every order, thoughtfully organised.</p>
          </div>

          <button
            type="button"
            className="my-orders-refresh"
            onClick={fetchOrders}
            disabled={loading}
          >
            {loading ? "Loading..." : "↻ Refresh"}
          </button>
        </header>

        <nav className="my-orders-filters" aria-label="Filter orders">
          {[
            ["all", "All Orders"],
            ["active", "Active"],
            ["delivered", "Delivered"],
            ["cancelled", "Cancelled"],
          ].map(([value, label]) => (
            <button
              type="button"
              key={value}
              className={filter === value ? "active" : ""}
              onClick={() => setFilter(value)}
              aria-pressed={filter === value}
            >
              {label}
            </button>
          ))}
        </nav>

        {message && (
          <p className="my-orders-message" role="status">
            {message}
          </p>
        )}

        {error && (
          <div className="my-orders-error" role="alert">
            <p>{error}</p>
            <button type="button" onClick={fetchOrders}>
              Try again
            </button>
          </div>
        )}

        {loading && orders.length === 0 ? (
          <div className="my-orders-loading">
            <span className="my-orders-spinner" />
            <p>Loading your orders...</p>
          </div>
        ) : !error && filteredOrders.length === 0 ? (
          <section className="my-orders-empty">
            <div className="my-orders-empty-icon" aria-hidden="true">
              ◇
            </div>
            <h2>
              {orders.length === 0
                ? "Your first order awaits."
                : "No orders in this category."}
            </h2>
            <p>
              {orders.length === 0
                ? "Explore the menu and discover something delicious."
                : "Try another filter to see your orders."}
            </p>
            {orders.length === 0 && (
              <Link
                to="/foodmenu"
                className="my-orders-primary-button"
              >
                Explore Our Menu
              </Link>
            )}
          </section>
        ) : (
          <section className="my-orders-list">
            {filteredOrders.map((order) => {
              const canCancel = ["placed", "confirmed"].includes(
                order.orderStatus
              );

              return (
                <article className="my-order-card" key={order._id}>
                  <div className="my-order-top">
                    <div>
                      <p className="my-order-label">ORDER REFERENCE</p>
                      <h2>#{order._id.slice(-8).toUpperCase()}</h2>
                      <p className="my-order-date">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>

                    <span
                      className={`my-order-status status-${order.orderStatus}`}
                    >
                      {String(order.orderStatus || "placed").replaceAll(
                        "-",
                        " "
                      )}
                    </span>
                  </div>

                  <div className="my-order-items">
                    {(order.items || []).map((item, index) => (
                      <div
                        className="my-order-item"
                        key={`${item.food || item.name}-${index}`}
                      >
                        {item.image ? (
                          <img src={item.image} alt={item.name} />
                        ) : (
                          <div className="my-order-item-placeholder">
                            ✦
                          </div>
                        )}

                        <div className="my-order-item-copy">
                          <strong>{item.name}</strong>
                          <span>Quantity: {item.quantity}</span>
                        </div>

                        <strong className="my-order-item-price">
                          {formatPrice(item.price * item.quantity)}
                        </strong>
                      </div>
                    ))}
                  </div>

                  <div className="my-order-bottom">
                    <div className="my-order-meta">
                      <span>
                        {String(order.orderType || "delivery").replaceAll(
                          "-",
                          " "
                        )}
                      </span>
                      <span>
                        Payment: {order.paymentStatus || "pending"}
                      </span>
                    </div>

                    <div className="my-order-total">
                      <span>Total</span>
                      <strong>{formatPrice(order.totalAmount)}</strong>
                    </div>
                  </div>

                  {canCancel && (
                    <div className="my-order-actions">
                      <button
                        type="button"
                        className="my-order-cancel"
                        onClick={() => cancelOrder(order._id)}
                        disabled={activeOrder === order._id}
                      >
                        {activeOrder === order._id
                          ? "Cancelling..."
                          : "Cancel Order"}
                      </button>
                    </div>
                  )}
                </article>
              );
            })}
          </section>
        )}
      </div>
    </main>
  );
}

export default MyOrders;