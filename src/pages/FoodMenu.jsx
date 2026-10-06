import React, { useEffect, useState } from "react";
import "../Appcss/FoodMenu.css";
import { useCart } from "../components/CartContext";

function FoodMenu() {
  const { addToCart } = useCart();

  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [category, setCategory] = useState("All");
  const [foodType, setFoodType] = useState("All");
  const [rating, setRating] = useState("All");
  const [sortPrice, setSortPrice] = useState("");
  const [search, setSearch] = useState("");

  // Get food from backend
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/foods");

        if (!response.ok) {
          throw new Error("Failed to fetch food data");
        }

        const data = await response.json();

        setFoods(data);
      } catch (error) {
        console.error(error);
        setError("Unable to load food menu.");
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  // Filter food
  const filteredFood = foods
    .filter((food) => {
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
    })
    .sort((a, b) => {
      if (sortPrice === "Low") {
        return a.price - b.price;
      }

      if (sortPrice === "High") {
        return b.price - a.price;
      }

      return 0;
    });

  // Loading
  if (loading) {
    return (
      <div className="menu-section">
        <h2>Loading Food Menu...</h2>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="menu-section">
        <h2>{error}</h2>
        <p>
          Make sure the backend is running on port 5000.
        </p>
      </div>
    );
  }

  return (
    <div className="food-menu">

      <section className="hero-section">
        <h1>Our Food Menu</h1>
        <p>Delicious food prepared with love</p>
      </section>

      {/* Filters */}
      <div className="filters">

        {/* Search */}
        <input
          type="text"
          placeholder="Search food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Indian">Indian</option>
          <option value="Chinese">Chinese</option>
          <option value="Italian">Italian</option>
          <option value="Fast Food">Fast Food</option>
          <option value="Healthy">Healthy</option>
          <option value="Drinks">Drinks</option>
        </select>

        {/* Food Type */}
        <select
          value={foodType}
          onChange={(e) => setFoodType(e.target.value)}
        >
          <option value="All">All Types</option>
          <option value="dish">Dish</option>
          <option value="cuisine">Cuisine</option>
          <option value="dessert">Dessert</option>
          <option value="beverage">Beverage</option>
        </select>

        {/* Rating */}
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          <option value="All">All Ratings</option>
          <option value="4">4★ & above</option>
          <option value="4.5">4.5★ & above</option>
          <option value="4.8">4.8★ & above</option>
        </select>

        {/* Price */}
        <select
          value={sortPrice}
          onChange={(e) => setSortPrice(e.target.value)}
        >
          <option value="">Sort by Price</option>
          <option value="Low">Low to High</option>
          <option value="High">High to Low</option>
        </select>

        {/* Clear Filters */}
        <button
          id="clearFilters"
          onClick={() => {
            setCategory("All");
            setFoodType("All");
            setRating("All");
            setSortPrice("");
            setSearch("");
          }}
        >
          Clear Filters
        </button>

      </div>

      {/* Food Cards */}
      <section className="menu-section">

        <div className="menu-grid">

          {filteredFood.length === 0 ? (
            <p>No food items found.</p>
          ) : (
            filteredFood.map((food) => (

              <div className="menu-item" key={food._id}>

                <img
                  src={food.image || food.imgUrl}
                  alt={food.name}
                />

                <h3>{food.name}</h3>

                <p>
                  {food.description}
                </p>

                <p>
                  ⭐ {food.rating}
                </p>

                <p>
                  <strong>₹{food.discountedPrice || food.price}</strong>
                </p>

                {food.discountPercentage > 0 && (
                  <p>
                    <del>₹{food.price}</del>{" "}
                    {food.discountPercentage}% OFF
                  </p>
                )}

                <p>
                  {food.category}
                </p>

                <p>
                  {food.type}
                </p>

                <button
                  onClick={() => addToCart(food)}
                >
                  Add to Cart
                </button>

              </div>

            ))
          )}

        </div>

      </section>

    </div>
  );
}

export default FoodMenu;