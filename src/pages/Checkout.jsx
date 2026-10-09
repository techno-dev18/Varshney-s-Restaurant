
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../components/CartContext";
import "../Css/Checkout.css";

function readSavedUser() {
  try {
    return JSON.parse(localStorage.getItem("user") || "{}");
  } catch {
    return {};
  }
}

function getFoodId(food) {
  return food._id || food.id;
}

function getPrice(food) {
  const discountedPrice = Number(food.discountedPrice);
  const price = Number(food.price || 0);

  return discountedPrice > 0 ? discountedPrice : price;
}

function Checkout() {
  const { cartItems, totalPrice, clearCart } = useCart();

  const [orderType, setOrderType] = useState("delivery");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [phone, setPhone] = useState(() => {
    const user = readSavedUser();
    return user.phone || "";
  });
  const [paymentMethod] = useState("cash");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [placedOrder, setPlacedOrder] = useState(null);

  const formatPrice = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(amount);

  const token = localStorage.getItem("token");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!token) {
      setError("Please log in before placing your order.");
      return;
    }

    if (cartItems.length === 0) {
      setError("Your cart is empty. Add a dish before checkout.");
      return;
    }

    if (!phone.trim()) {
      setError("Please enter your contact phone number.");
      return;
    }

    if (orderType === "delivery" && !deliveryAddress.trim()) {
      setError("Please enter your complete delivery address.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cartItems.map((food) => ({
            food: getFoodId(food),
            quantity: food.quantity || 1,
          })),
          orderType,
          deliveryAddress:
            orderType === "delivery" ? deliveryAddress.trim() : "",
          phone: phone.trim(),
          paymentMethod,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to place your order.");
      }

      if (!data.order?._id) {
        throw new Error("The server did not return a saved order.");
      }

      setPlacedOrder(data.order);
      clearCart();
    } catch (requestError) {
      setError(
        requestError.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  if (placedOrder) {
    return (
      <main className="checkout-page">
        <section className="checkout-success">
          <div className="checkout-success-icon" aria-hidden="true">
            ✓
          </div>

          <p className="checkout-eyebrow">THANK YOU FOR YOUR ORDER</p>
          <h1>Your order has been placed.</h1>

          <p className="checkout-success-description">
            Your order has been saved successfully. Keep your order ID
            for future reference.
          </p>

          <div className="checkout-confirmation-card">
            <div>
              <span>Order ID</span>
              <strong>{placedOrder._id}</strong>
            </div>

            <div>
              <span>Order status</span>
              <strong>{placedOrder.orderStatus}</strong>
            </div>

            <div>
              <span>Payment</span>
              <strong>Cash — pending</strong>
            </div>

            <div>
              <span>Order total</span>
              <strong>{formatPrice(placedOrder.totalAmount)}</strong>
            </div>
          </div>

          <Link to="/" className="checkout-submit-button">
            Return to Home <span aria-hidden="true">→</span>
          </Link>

          <p className="checkout-success-note">
            You can view this order later from your account's order history.
          </p>
        </section>
      </main>
    );
  }

  if (!token) {
    return (
      <main className="checkout-page">
        <section className="checkout-empty">
          <p className="checkout-eyebrow">ALMOST THERE</p>
          <h1>Log in to continue.</h1>
          <p>
            Please log in to place an order. Your cart will remain available
            while you navigate within this session.
          </p>
          <Link to="/login" className="checkout-submit-button">
            Log In <span aria-hidden="true">→</span>
          </Link>
          <Link to="/cart" className="checkout-back-link">
            Return to cart
          </Link>
        </section>
      </main>
    );
  }

  if (cartItems.length === 0) {
    return (
      <main className="checkout-page">
        <section className="checkout-empty">
          <p className="checkout-eyebrow">YOUR NEXT MEAL AWAITS</p>
          <h1>Your cart is empty.</h1>
          <p>Add your favourite dishes before proceeding to checkout.</p>
          <Link to="/foodmenu" className="checkout-submit-button">
            Explore Our Menu <span aria-hidden="true">→</span>
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <div className="checkout-container">
        <header className="checkout-heading">
          <p className="checkout-eyebrow">A THOUGHTFUL DINING EXPERIENCE</p>
          <h1>Complete Your Order</h1>
          <p>Confirm your details and review your selection.</p>
        </header>

        <form className="checkout-layout" onSubmit={handleSubmit}>
          <div className="checkout-form-column">
            <section className="checkout-card">
              <div className="checkout-section-heading">
                <span className="checkout-step-number">01</span>
                <div>
                  <h2>How would you like your order?</h2>
                  <p>Choose your preferred order type.</p>
                </div>
              </div>

              <div className="checkout-order-types">
                {[
                  {
                    value: "delivery",
                    title: "Home Delivery",
                    description: "Deliver to your address",
                  },
                  {
                    value: "takeaway",
                    title: "Takeaway",
                    description: "Collect your order",
                  },
                  {
                    value: "dine-in",
                    title: "Dine-In",
                    description: "Enjoy at the restaurant",
                  },
                ].map((option) => (
                  <label
                    className={`checkout-type-option ${
                      orderType === option.value ? "selected" : ""
                    }`}
                    key={option.value}
                  >
                    <input
                      type="radio"
                      name="orderType"
                      value={option.value}
                      checked={orderType === option.value}
                      onChange={() => setOrderType(option.value)}
                    />
                    <span className="checkout-radio-mark" />
                    <span className="checkout-type-copy">
                      <strong>{option.title}</strong>
                      <small>{option.description}</small>
                    </span>
                  </label>
                ))}
              </div>

              {orderType === "delivery" && (
                <div className="checkout-field">
                  <label htmlFor="deliveryAddress">
                    Complete delivery address
                  </label>
                  <textarea
                    id="deliveryAddress"
                    value={deliveryAddress}
                    onChange={(event) =>
                      setDeliveryAddress(event.target.value)
                    }
                    placeholder="House/flat number, street, area, city and PIN code"
                    rows={4}
                    maxLength={500}
                    required
                  />
                </div>
              )}
            </section>

            <section className="checkout-card">
              <div className="checkout-section-heading">
                <span className="checkout-step-number">02</span>
                <div>
                  <h2>Contact information</h2>
                  <p>We may need these details about your order.</p>
                </div>
              </div>

              <div className="checkout-field">
                <label htmlFor="phone">Contact phone number</label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="Enter your phone number"
                  maxLength={20}
                  required
                />
              </div>
            </section>

            <section className="checkout-card">
              <div className="checkout-section-heading">
                <span className="checkout-step-number">03</span>
                <div>
                  <h2>Payment method</h2>
                  <p>Choose a supported payment option.</p>
                </div>
              </div>

              <div className="checkout-payment-option">
                <span className="checkout-payment-icon" aria-hidden="true">
                  ₹
                </span>
                <div>
                  <strong>
                    {orderType === "delivery"
                      ? "Cash on Delivery"
                      : "Pay at Restaurant"}
                  </strong>
                  <p>
                    Pay when your order is delivered or collected, as
                    applicable.
                  </p>
                </div>
                <span className="checkout-payment-tag">Available</span>
              </div>
            </section>
          </div>

          <aside className="checkout-summary">
            <p className="checkout-eyebrow">YOUR SELECTION</p>
            <h2>Order Summary</h2>

            <div className="checkout-summary-items">
              {cartItems.map((food) => {
                const id = getFoodId(food);
                const quantity = food.quantity || 1;
                const image = food.image || food.imgUrl;

                return (
                  <div className="checkout-summary-item" key={id}>
                    {image ? (
                      <img src={image} alt={food.name || "Food item"} />
                    ) : (
                      <div className="checkout-summary-image-placeholder">
                        ✦
                      </div>
                    )}

                    <div className="checkout-summary-item-copy">
                      <strong>{food.name || food.title || "Food item"}</strong>
                      <span>Qty: {quantity}</span>
                    </div>

                    <strong className="checkout-summary-item-price">
                      {formatPrice(getPrice(food) * quantity)}
                    </strong>
                  </div>
                );
              })}
            </div>

            <div className="checkout-summary-divider" />

            <div className="checkout-total-row">
              <span>Subtotal</span>
              <strong>{formatPrice(totalPrice)}</strong>
            </div>

            <div className="checkout-total-row checkout-total-final">
              <span>Estimated total</span>
              <strong>{formatPrice(totalPrice)}</strong>
            </div>

            <p className="checkout-summary-note">
              Delivery fees and taxes are not included unless already reflected
              in the displayed prices.
            </p>

            {error && (
              <p className="checkout-error" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="checkout-submit-button"
              disabled={loading}
            >
              {loading ? "Placing Order..." : "Place Order"}
              {!loading && <span aria-hidden="true">→</span>}
            </button>

            <p className="checkout-terms-note">
              By placing your order, you confirm that your contact and order
              details are correct.
            </p>
          </aside>
        </form>
      </div>
    </main>
  );
}

export default Checkout;