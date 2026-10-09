
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft, FaMinus, FaPlus, FaShoppingCart, FaStar } from "react-icons/fa";

import { useCart } from "../components/CartContext";
import "../Css/FoodDetails.css";

const API_URL = "http://localhost:5000/api/foods";

function FoodDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [food, setFood] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchFood() {
      setLoading(true);
      setError("");
      setFood(null);
      setQuantity(1);
      setAdded(false);

      try {
        const response = await fetch(`${API_URL}/${id}`, {
          signal: controller.signal,
        });

        if (response.status === 404) {
          throw new Error("This food item could not be found.");
        }

        if (!response.ok) {
          throw new Error("Unable to load this food item. Please try again.");
        }

        const data = await response.json();

        // Supports APIs that return either a food object or { food: ... }.
        const foodItem = data.food || data;

        if (!foodItem || !(foodItem._id || foodItem.id)) {
          throw new Error("The server returned invalid food details.");
        }

        setFood(foodItem);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchFood();

    return () => controller.abort();
  }, [id]);

  const currentPrice = Number(
    food?.discountedPrice > 0 ? food.discountedPrice : food?.price || 0
  );

  const originalPrice = Number(food?.price || 0);
  const hasDiscount =
    originalPrice > currentPrice && currentPrice > 0;

  const imageUrl = food?.image || food?.imgUrl || "";

  const handleAddToCart = () => {
    if (!food) return;

    addToCart(food, quantity);
    setAdded(true);
  };

  if (loading) {
    return (
      <main className="food-details-page">
        <div className="food-details-status">
          <span className="loading-spinner" />
          <p>Preparing your food details...</p>
        </div>
      </main>
    );
  }

  if (error || !food) {
    return (
      <main className="food-details-page">
        <div className="food-details-status">
          <h1>Food details unavailable</h1>
          <p>{error || "We couldn't find this food item."}</p>
          <Link to="/foodmenu" className="details-back-link">
            <FaArrowLeft /> Back to Food Menu
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="food-details-page">
      <div className="food-details-container">
        <Link to="/foodmenu" className="details-back-link">
          <FaArrowLeft />
          <span>Back to Food Menu</span>
        </Link>

        <section className="food-details">
          <div className="food-details-image-wrap">
            {imageUrl ? (
              <img
                className="food-details-image"
                src={imageUrl}
                alt={food.name}
              />
            ) : (
              <div className="food-image-placeholder">
                Image not available
              </div>
            )}

            {hasDiscount && (
              <span className="food-discount">
                {food.discountPercentage
                  ? `${food.discountPercentage}% OFF`
                  : "Special Price"}
              </span>
            )}
          </div>

          <div className="food-details-content">
            <div className="food-details-tags">
              {food.category && (
                <span className="food-tag">{food.category}</span>
              )}
              {food.type && (
                <span className="food-tag food-type">{food.type}</span>
              )}
            </div>

            <p className="food-details-eyebrow">
              FROM VARSHNEY'S KITCHEN
            </p>

            <h1>{food.name}</h1>

            {food.rating != null && (
              <div className="food-details-rating">
                <FaStar />
                <span>{food.rating}</span>
                <span className="rating-label">Customer rating</span>
              </div>
            )}

            <p className="food-details-description">
              {food.description || "Freshly prepared for you to enjoy."}
            </p>

            <div className="food-details-price">
              <strong>₹{currentPrice.toFixed(2)}</strong>
              {hasDiscount && (
                <del>₹{originalPrice.toFixed(2)}</del>
              )}
              {hasDiscount && (
                <span className="saving-label">Special offer</span>
              )}
            </div>

            <div className="food-details-divider" />

            <div className="food-details-purchase">
              <div className="quantity-section">
                <span className="quantity-label">Quantity</span>
                <div className="quantity-control">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    disabled={quantity <= 1}
                    onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  >
                    <FaMinus />
                  </button>

                  <span aria-live="polite">{quantity}</span>

                  <button
                    type="button"
                    aria-label="Increase quantity"
                    disabled={quantity >= 20}
                    onClick={() => setQuantity((value) => Math.min(20, value + 1))}
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>

              <button
                type="button"
                className={`details-add-button${added ? " is-added" : ""}`}
                onClick={handleAddToCart}
              >
                <FaShoppingCart />
                {added ? "Add More to Cart" : "Add to Cart"}
              </button>
            </div>

            <p className="food-details-total">
              Subtotal: <strong>₹{(currentPrice * quantity).toFixed(2)}</strong>
            </p>

            {added && (
              <p className="cart-success" role="status">
                Added to your cart successfully.
              </p>
            )}

            <p className="food-details-note">
              Final availability and order details can be confirmed at checkout.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default FoodDetails;