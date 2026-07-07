import React, { useState } from "react";
import "../Appcss/FoodMenu.css";
import FMdata from "../data/FMdata";
import { useCart } from "../components/CartContext";
function FoodMenu() {
  const { addToCart, cartItems } = useCart();
  const [category, setCategory] = useState("All");
  const [foodType, setFoodType] = useState("All");
  const [rating, setRating] = useState("All");
  const [sortPrice, setSortPrice] = useState("");
  const [search, setSearch] = useState("");
  const filteredFood = FMdata.filter((food) => {
    const categoryMatch =
      category === "All" || food.category === category;

    const typeMatch =
      foodType === "All" || food.type === foodType;

    const ratingMatch =
      rating === "All" || food.rating >= Number(rating);

    const searchMatch =
      food.name.toLowerCase().includes(search.toLowerCase());

    return (
      categoryMatch &&
      typeMatch &&
      ratingMatch &&
      searchMatch
    );
  }).sort((a, b) => {
    if (sortPrice === "low") return a.price - b.price;
    if (sortPrice === "high") return b.price - a.price;
    return 0;
  });

  return (
    <>
      <div className="filters">

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Starters">Starters</option>
          <option value="Indian Main Course">Indian Main Course</option>
          <option value="Biryani & Rice">Biryani & Rice</option>
          <option value="Chinese Cuisine">Chinese Cuisine</option>
          <option value="Italian Cuisine">Italian Cuisine</option>
          <option value="Desserts">Desserts</option>
          <option value="Beverages">Beverages</option>
        </select>

        <select
          value={foodType}
          onChange={(e) => setFoodType(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Veg">Veg</option>
          <option value="Non-Veg">Non-Veg</option>
        </select>

        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          <option value="All">All Ratings</option>
          <option value="4">4⭐ & Above</option>
          <option value="3">3⭐ & Above</option>
        </select>

        <select
          value={sortPrice}
          onChange={(e) => setSortPrice(e.target.value)}
        >
          <option value="">Sort by Price</option>
          <option value="low">Low to High</option>
          <option value="high">High to Low</option>
        </select>

        <input
          type="text"
          placeholder="Search Food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button>
          Cart ({cartItems.length})
        </button>

        <button
          onClick={() => {
            setCategory("All");
            setFoodType("All");
            setRating("All");
            setSortPrice("");
            setSearch("");
          }}
        >
          Clear
        </button>

      </div>
      <section className="menu-section">

        <div className="menu-grid">

          {filteredFood.map((food) => (

            <div
              className="menu-item"
              key={food.id}
            >

              <img src={food.image} alt={food.name} />

              <h3>{food.name}</h3>

              <p>{food.description}</p>

              <p>{food.category}</p>

              <p>{food.type}</p>

              <p className="rating">⭐ {food.rating}</p>

              <p>
                <span className="old-price">₹{food.price}</span>{" "}
                <span className="new-price">₹{food.discountedPrice}</span>
              </p>

              <div className="discount-badge">
                {food.discountPercentage}% OFF
              </div>

              <button onClick={() => addToCart(food)}>
                Add to Cart
              </button>
            </div>

          ))}

        </div>

      </section>
    </>
  );

}

export default FoodMenu;