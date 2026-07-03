import React from "react";
import "../Appcss/FoodMenu.css";
import { useCart } from "../components/CartContext";
function FoodMenu() {
  const { addToCart } = useCart();

  return (
    <>
      <section className="hero-section">
        <div className="hero-content">
          <h1>Explore Our Delicious Menu</h1>
          <p>Discover a variety of dishes crafted with love and passion.</p>
          <p>Premium Multi-Cuisine Dining Experience</p>
        </div>
      </section>

      <div className="filters">
        <select>
          <option value="">All Categories</option>
          <option value="Starters">Starters</option>
          <option value="Indian Main Course">
            Indian Main Course
          </option>
          <option value="Biryani & Rice">
            Biryani & Rice
          </option>
          <option value="Chinese Cuisine">
            Chinese Cuisine
          </option>
          <option value="Italian Cuisine">
            Italian Cuisine
          </option>
          <option value="Desserts">
            Desserts
          </option>
          <option value="Beverages">
            Beverages
          </option>
        </select>

        <select>
          <option value="">All</option>
          <option value="veg">Veg</option>
          <option value="nonveg">Non-Veg</option>
        </select>

        <select>
          <option value="">All Ratings</option>
          <option value="4">4⭐ & above</option>
          <option value="3">3⭐ & above</option>
        </select>

        <select>
          <option value="">Sort by Price</option>
          <option value="low">Low to High</option>
          <option value="high">High to Low</option>
        </select>

        <input
          type="text"
          placeholder="Search food..."
        />

        <button>Cart (0)</button>

        <button>Clear</button>
      </div>

      <section className="menu-section">
        <h2>Starters</h2>

        <div className="menu-grid">
          <div className="menu-item">
            <h3>Paneer Tikka</h3>
            <p>₹220</p>
            <button
  onClick={() => addToCart()}
>
  Add to Cart
</button>
          </div>

          <div className="menu-item">
            <h3>Paneer Malai Tikka</h3>
            <p>₹240</p>
            <button
  onClick={() => addToCart()}
>
  Add to Cart
</button>
          </div>

          <div className="menu-item">
            <h3>Chicken Tikka</h3>
            <p>₹260</p>
            <button
  onClick={() => addToCart()}
>
  Add to Cart
</button>
          </div>
        </div>

        <h2>Indian Main Course</h2>

        <div className="menu-grid">
          <div className="menu-item">
            <h3>Paneer Butter Masala</h3>
            <p>₹260</p>
            <button
  onClick={() => addToCart()}
>
  Add to Cart
</button>
          </div>

          <div className="menu-item">
            <h3>Butter Chicken</h3>
            <p>₹320</p>
            <button
  onClick={() => addToCart()}
>
  Add to Cart
</button>
          </div>
        </div>
      </section>
    </>
  );
}

export default FoodMenu;