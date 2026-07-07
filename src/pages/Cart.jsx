import React from "react";
import { useCart } from "../components/CartContext";
import "../Appcss/Cart.css";
function Cart() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    totalPrice,
  } = useCart();

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <img
                src={item.image}
                alt={item.name}
              />

              <div>
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>

                <button
                  onClick={() =>
                    decreaseQuantity(item.id)
                  }
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() =>
                    increaseQuantity(item.id)
                  }
                >
                  +
                </button>

                <br />

                <button
                  onClick={() =>
                    removeFromCart(item.id)
                  }
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <h2>Total: ₹{totalPrice}</h2>

          <button className="checkout">
            Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;