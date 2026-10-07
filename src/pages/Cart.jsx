import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../components/CartContext";
import "../Css/Cart.css";

function Cart() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    totalPrice,
  } = useCart();

  const getItemId = (item) => item._id || item.id;

  const getItemPrice = (item) =>
    item.discountedPrice || item.price || 0;

  if (cartItems.length === 0) {
    return (
      <main className="vcart">
        {/* HERO */}
        <section className="vcart-hero">
          <div className="vcart-hero-content">
            <p className="vcart-eyebrow">Varshney's Group</p>

            <h1>Your Cart</h1>

            <span className="vcart-rule"></span>

            <p>
              Review your selections before placing your order.
            </p>
          </div>
        </section>

        {/* EMPTY CART */}
        <section className="vcart-empty-section">
          <div className="vcart-empty">

            <span className="vcart-empty-number">
              00
            </span>

            <h2>Your cart is empty</h2>

            <p>
              You haven't added anything to your cart yet.
              Explore our menu and discover something delicious.
            </p>

            <Link
              to="/foodmenu"
              className="vcart-primary-btn"
            >
              Explore the Menu
            </Link>

          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="vcart">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="vcart-hero">
        <div className="vcart-hero-content">

          <p className="vcart-eyebrow">
            Varshney's Group
          </p>

          <h1>Your Cart</h1>

          <span className="vcart-rule"></span>

          <p>
            Review your selections before placing your order.
          </p>

        </div>
      </section>

      {/* =====================================================
          CART CONTENT
      ===================================================== */}

      <section className="vcart-section">

        <div className="vcart-container">

          <div className="vcart-heading">

            <div>
              <p className="vcart-kicker">
                Your selection
              </p>

              <h2>
                {cartItems.length}{" "}
                {cartItems.length === 1
                  ? "item"
                  : "items"}{" "}
                in your cart
              </h2>
            </div>

            <Link
              to="/foodmenu"
              className="vcart-continue"
            >
              ← Continue Shopping
            </Link>

          </div>

          <div className="vcart-layout">

            {/* =================================================
                ITEMS
            ================================================= */}

            <div className="vcart-items">

              {cartItems.map((item) => {

                const itemId = getItemId(item);
                const price = getItemPrice(item);

                return (
                  <article
                    className="vcart-item"
                    key={itemId}
                  >

                    {/* IMAGE */}

                    <div className="vcart-image-wrapper">

                      <img
                        src={
                          item.image ||
                          item.imgUrl ||
                          item.imgURL
                        }
                        alt={item.name}
                      />

                    </div>

                    {/* DETAILS */}

                    <div className="vcart-item-content">

                      <div className="vcart-item-header">

                        <div>
                          <p className="vcart-item-category">
                            {item.category || "Food"}
                          </p>

                          <h3>
                            {item.name}
                          </h3>
                        </div>

                        <button
                          type="button"
                          className="vcart-remove-top"
                          onClick={() =>
                            removeFromCart(itemId)
                          }
                          aria-label={`Remove ${item.name}`}
                        >
                          ×
                        </button>

                      </div>

                      <p className="vcart-item-price">
                        ₹{Number(price).toLocaleString("en-IN")}
                      </p>

                      {/* QUANTITY */}

                      <div className="vcart-item-bottom">

                        <div className="vcart-quantity">

                          <button
                            type="button"
                            onClick={() =>
                              decreaseQuantity(itemId)
                            }
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>

                          <span>
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              increaseQuantity(itemId)
                            }
                            aria-label="Increase quantity"
                          >
                            +
                          </button>

                        </div>

                        <span className="vcart-item-total">
                          ₹
                          {(
                            Number(price) *
                            Number(item.quantity || 1)
                          ).toLocaleString("en-IN")}
                        </span>

                      </div>

                    </div>

                  </article>
                );
              })}

            </div>

            {/* =================================================
                ORDER SUMMARY
            ================================================= */}

            <aside className="vcart-summary">

              <p className="vcart-kicker">
                Order summary
              </p>

              <h2>
                Your Order
              </h2>

              <div className="vcart-summary-line">
                <span>Items</span>
                <span>{cartItems.length}</span>
              </div>

              <div className="vcart-summary-line">
                <span>Subtotal</span>
                <span>
                  ₹
                  {Number(totalPrice).toLocaleString("en-IN")}
                </span>
              </div>

              <div className="vcart-summary-line">
                <span>Delivery</span>
                <span className="vcart-free">
                  To be calculated
                </span>
              </div>

              <div className="vcart-summary-divider"></div>

              <div className="vcart-total">
                <span>Total</span>

                <strong>
                  ₹
                  {Number(totalPrice).toLocaleString("en-IN")}
                </strong>
              </div>

              <button
                type="button"
                className="vcart-checkout"
                onClick={() =>
                  alert(
                    "Checkout will be available soon."
                  )
                }
              >
                Proceed to Checkout
              </button>

              <p className="vcart-secure">
                Secure checkout · Freshly prepared ·
                Quality service
              </p>

            </aside>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Cart;