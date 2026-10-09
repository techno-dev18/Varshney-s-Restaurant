import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../components/CartContext";
import "../Css/Cart.css";

function getFoodId(food) {
  return food._id || food.id;
}

function getFoodPrice(food) {
  const discountedPrice = Number(food.discountedPrice);
  const price = Number(food.price || 0);

  return discountedPrice > 0 ? discountedPrice : price;
}

function Cart() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    totalPrice,
  } = useCart();

const navigate = useNavigate();

  const formatPrice = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(amount);
const handleCheckout = () => {
  navigate("/checkout");
};
 

  if (cartItems.length === 0) {
    return (
      <main className="cart-page">
        <section className="cart-empty">
          <div className="cart-empty-icon" aria-hidden="true">
            ♧
          </div>

          <p className="cart-eyebrow">YOUR DINING EXPERIENCE STARTS HERE</p>
          <h1>Your cart is waiting.</h1>
          <p className="cart-empty-description">
            Discover your favourites, choose your dishes, and add something
            delicious to your cart.
          </p>

          <Link to="/foodmenu" className="cart-primary-button">
            Explore Our Menu <span aria-hidden="true">→</span>
          </Link>

          <Link to="/" className="cart-back-link">
            Back to home
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <section className="cart-container">
        <div className="cart-heading">
          <div>
            <p className="cart-eyebrow">A LITTLE SOMETHING DELICIOUS</p>
            <h1>Your Shopping Cart</h1>
            <p className="cart-heading-description">
              Review your selection before continuing.
            </p>
          </div>

          <div className="cart-item-count">
            <span>{cartItems.reduce((count, item) => count + item.quantity, 0)}</span>
            <span>items</span>
          </div>
        </div>

        <div className="cart-layout">
          <section className="cart-items-section">
            <div className="cart-section-heading">
              <h2>Your selection</h2>

              <button
                type="button"
                className="cart-clear-button"
                onClick={clearCart}
              >
                Clear cart
              </button>
            </div>

            <div className="cart-items">
              {cartItems.map((food) => {
                const id = getFoodId(food);
                const price = getFoodPrice(food);
                const quantity = food.quantity || 1;
                const image = food.image || food.imgUrl;

                return (
                  <article className="cart-item" key={id}>
                    <div className="cart-item-image">
                      {image ? (
                        <img src={image} alt={food.name || "Food item"} />
                      ) : (
                        <div className="cart-image-placeholder">
                          <span aria-hidden="true">✦</span>
                          <span>Varshney's</span>
                        </div>
                      )}
                    </div>

                    <div className="cart-item-info">
                      <p className="cart-item-category">
                        {food.category || "SELECTED DISH"}
                      </p>

                      <h3>{food.name || food.title || "Food item"}</h3>

                      <p className="cart-item-unit-price">
                        {formatPrice(price)} <span>/ item</span>
                      </p>

                      <div className="cart-item-actions">
                        <div className="cart-quantity-control">
                          <button
                            type="button"
                            onClick={() => decreaseQuantity(id)}
                            aria-label={`Decrease quantity of ${food.name}`}
                          >
                            −
                          </button>

                          <span aria-live="polite">{quantity}</span>

                          <button
                            type="button"
                            onClick={() => increaseQuantity(id)}
                            aria-label={`Increase quantity of ${food.name}`}
                          >
                            +
                          </button>
                        </div>

                        <button
                          type="button"
                          className="cart-remove-button"
                          onClick={() => removeFromCart(id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    <div className="cart-item-total">
                      <span>Item total</span>
                      <strong>{formatPrice(price * quantity)}</strong>
                    </div>
                  </article>
                );
              })}
            </div>

            <Link to="/foodmenu" className="cart-continue-link">
              <span aria-hidden="true">←</span> Continue shopping
            </Link>
          </section>

          <aside className="cart-summary">
            <p className="cart-eyebrow">ORDER OVERVIEW</p>
            <h2>Order Summary</h2>

            <div className="cart-summary-row">
              <span>Items ({cartItems.reduce((count, item) => count + item.quantity, 0)})</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>

            <div className="cart-summary-row">
              <span>Delivery</span>
              <span className="cart-delivery-note">Calculated at checkout</span>
            </div>

            <div className="cart-summary-divider" />

            <div className="cart-summary-total">
              <span>Subtotal</span>
              <strong>{formatPrice(totalPrice)}</strong>
            </div>

            <p className="cart-summary-note">
              Your final payable amount may include delivery charges and
              applicable taxes at checkout.
            </p>

            <button
              type="button"
              className="cart-checkout-button"
              onClick={handleCheckout}
            >
              Proceed to Checkout <span aria-hidden="true">→</span>
            </button>

           

            <div className="cart-secure-note">
              <span aria-hidden="true">◇</span>
              <span>Freshly selected. Carefully prepared.</span>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

export default Cart;