import React, { useEffect, useState } from "react";
import "../Css/FoodMenu.css";
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

  /* ========================================
     GET FOOD FROM BACKEND
  ======================================== */

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/foods"
        );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch food data"
          );
        }

        const data = await response.json();

        setFoods(data);
      } catch (error) {
        console.error(error);

        setError(
          "Unable to load food menu."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);


  /* ========================================
     FILTER FOOD
  ======================================== */

  const filteredFood = foods
    .filter((food) => {

      const categoryMatch =
        category === "All" ||
        food.category === category;

      const typeMatch =
        foodType === "All" ||
        food.type === foodType;

      const ratingMatch =
        rating === "All" ||
        food.rating >= Number(rating);

      const searchMatch =
        food.name
          .toLowerCase()
          .includes(search.toLowerCase());

      return (
        categoryMatch &&
        typeMatch &&
        ratingMatch &&
        searchMatch
      );
    })

    .sort((a, b) => {

      if (sortPrice === "Low") {
        return (
          (a.discountedPrice || a.price) -
          (b.discountedPrice || b.price)
        );
      }

      if (sortPrice === "High") {
        return (
          (b.discountedPrice || b.price) -
          (a.discountedPrice || a.price)
        );
      }

      return 0;
    });


  /* ========================================
     CLEAR FILTERS
  ======================================== */

  const clearFilters = () => {
    setCategory("All");
    setFoodType("All");
    setRating("All");
    setSortPrice("");
    setSearch("");
  };


  /* ========================================
     ADD TO CART
  ======================================== */

  const handleAddToCart = (food) => {
    addToCart(food);
  };


  /* ========================================
     LOADING
  ======================================== */

  if (loading) {
    return (
      <div className="food-message">

        <div className="loading-spinner"></div>

        <h2>
          Loading Food Menu...
        </h2>

        <p>
          Please wait while we prepare
          your menu.
        </p>

      </div>
    );
  }


  /* ========================================
     ERROR
  ======================================== */

  if (error) {
    return (
      <div className="food-message error-state">

        <h2>
          {error}
        </h2>

        <p>
          Make sure the backend is running
          on port 5000.
        </p>

        <button
          onClick={() =>
            window.location.reload()
          }
        >
          Try Again
        </button>

      </div>
    );
  }


  return (
    <div className="food-menu">

      {/* ====================================
          HERO
      ==================================== */}

      <section className="food-hero">

        <div className="food-hero-content">

          <h1>
            Our Food Menu
          </h1>

          <p>
            Delicious food prepared with
            love and served with care.
          </p>

        </div>

      </section>


      {/* ====================================
          FILTERS
      ==================================== */}

      <section className="food-filters">

        <div className="food-filter-header">

          <div>
            <h2>
              Explore Our Menu
            </h2>

            <p>
              Find your favourite food
              quickly.
            </p>
          </div>

          <button
            className="clear-food-filters"
            onClick={clearFilters}
          >
            Clear Filters
          </button>

        </div>


        <div className="food-filter-grid">

          {/* Search */}

          <div className="food-filter-group search-group">

            <label htmlFor="food-search">
              Search
            </label>

            <input
              id="food-search"
              type="text"
              placeholder="Search food..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>


          {/* Category */}

          <div className="food-filter-group">

            <label htmlFor="food-category">
              Category
            </label>

            <select
              id="food-category"
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
            >

              <option value="All">
                All Categories
              </option>

              <option value="Indian">
                Indian
              </option>

              <option value="Chinese">
                Chinese
              </option>

              <option value="Italian">
                Italian
              </option>

              <option value="Fast Food">
                Fast Food
              </option>

              <option value="Healthy">
                Healthy
              </option>

              <option value="Drinks">
                Drinks
              </option>

            </select>

          </div>


          {/* Food Type */}

          <div className="food-filter-group">

            <label htmlFor="food-type">
              Food Type
            </label>

            <select
              id="food-type"
              value={foodType}
              onChange={(e) =>
                setFoodType(e.target.value)
              }
            >

              <option value="All">
                All Types
              </option>

              <option value="dish">
                Dish
              </option>

              <option value="cuisine">
                Cuisine
              </option>

              <option value="dessert">
                Dessert
              </option>

              <option value="beverage">
                Beverage
              </option>

            </select>

          </div>


          {/* Rating */}

          <div className="food-filter-group">

            <label htmlFor="food-rating">
              Rating
            </label>

            <select
              id="food-rating"
              value={rating}
              onChange={(e) =>
                setRating(e.target.value)
              }
            >

              <option value="All">
                All Ratings
              </option>

              <option value="4">
                4★ & above
              </option>

              <option value="4.5">
                4.5★ & above
              </option>

              <option value="4.8">
                4.8★ & above
              </option>

            </select>

          </div>


          {/* Price */}

          <div className="food-filter-group">

            <label htmlFor="food-price">
              Price
            </label>

            <select
              id="food-price"
              value={sortPrice}
              onChange={(e) =>
                setSortPrice(e.target.value)
              }
            >

              <option value="">
                Sort by Price
              </option>

              <option value="Low">
                Low to High
              </option>

              <option value="High">
                High to Low
              </option>

            </select>

          </div>

        </div>

      </section>


      {/* ====================================
          FOOD RESULTS
      ==================================== */}

      <section className="menu-section">

        <div className="menu-heading">

          <div>

            <h2>
              Delicious Choices
            </h2>

            <p>
              {filteredFood.length}{" "}
              {filteredFood.length === 1
                ? "item"
                : "items"}{" "}
              available
            </p>

          </div>

        </div>


        {/* Food Grid */}

        {filteredFood.length === 0 ? (

          <div className="no-food">

            <h3>
              No food items found
            </h3>

            <p>
              Try changing your search
              or filters.
            </p>

            <button
              onClick={clearFilters}
            >
              Clear Filters
            </button>

          </div>

        ) : (

          <div className="menu-grid">

            {filteredFood.map((food) => (

              <div
                className="menu-item"
                key={food._id}
              >

                {/* Image */}

                <div className="food-image-wrapper">

                  <img
                    src={
                      food.image ||
                      food.imgUrl
                    }
                    alt={food.name}
                  />

                  {food.discountPercentage > 0 && (
                    <span className="discount-badge">
                      {food.discountPercentage}%
                      OFF
                    </span>
                  )}

                </div>


                {/* Card Content */}

                <div className="food-card-content">

                  <div className="food-card-top">

                    <h3>
                      {food.name}
                    </h3>

                    <span className="food-rating">
                      ⭐ {food.rating}
                    </span>

                  </div>


                  <p className="food-description">
                    {food.description}
                  </p>


                  <div className="food-meta">

                    <span>
                      {food.category}
                    </span>

                    <span>
                      {food.type}
                    </span>

                  </div>


                  {/* Price */}

                  <div className="food-price">

                    <strong>
                      ₹
                      {food.discountedPrice ||
                        food.price}
                    </strong>

                    {food.discountPercentage >
                      0 && (
                      <del>
                        ₹{food.price}
                      </del>
                    )}

                  </div>


                  {/* Add Cart */}

                  <button
                    className="add-cart-btn"
                    onClick={() =>
                      handleAddToCart(food)
                    }
                  >
                    Add to Cart
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </section>

    </div>
  );
}

export default FoodMenu;