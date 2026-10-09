
import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

const getItemId = (item) => item._id || item.id;

const getItemPrice = (item) => {
  const discountedPrice = Number(item.discountedPrice);
  const price = Number(item.price || 0);

  return discountedPrice > 0 ? discountedPrice : price;
};

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (food, quantity = 1) => {
    const foodId = getItemId(food);
    const amount = Math.max(1, Number(quantity) || 1);

    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => getItemId(item) === foodId
      );

      if (existingItem) {
        return currentItems.map((item) =>
          getItemId(item) === foodId
            ? { ...item, quantity: (item.quantity || 1) + amount }
            : item
        );
      }

      return [
        ...currentItems,
        { ...food, quantity: amount },
      ];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => getItemId(item) !== id)
    );
  };

  const increaseQuantity = (id) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        getItemId(item) === id
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          getItemId(item) === id
            ? { ...item, quantity: (item.quantity || 1) - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + getItemPrice(item) * (item.quantity || 1),
    0
  );

  const cartCount = cartItems.reduce(
    (total, item) => total + (item.quantity || 1),
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

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
};