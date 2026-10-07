import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Get the correct ID for both old and MongoDB food items
  const getItemId = (item) => item._id || item.id;

  // Get the actual selling price
  const getItemPrice = (item) =>
    item.discountedPrice || item.price || 0;

  // Add food to cart
  const addToCart = (food) => {
    const foodId = getItemId(food);

    const existingItem = cartItems.find(
      (item) => getItemId(item) === foodId
    );

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          getItemId(item) === foodId
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      );
    } else {
      setCartItems([
        ...cartItems,
        {
          ...food,
          quantity: 1,
        },
      ]);
    }
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCartItems(
      cartItems.filter(
        (item) => getItemId(item) !== id
      )
    );
  };

  // Increase quantity
  const increaseQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        getItemId(item) === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    setCartItems(
      cartItems
        .map((item) =>
          getItemId(item) === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Calculate total using discounted price when available
  const totalPrice = cartItems.reduce(
    (total, item) =>
      total +
      getItemPrice(item) * item.quantity,
    0
  );

  // Total number of products in cart
  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        totalPrice,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);