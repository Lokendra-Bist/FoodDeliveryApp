import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prev) => {
      if (prev.length > 0 && prev[0].restaurantId !== item.restaurantId) {
        toast.error("You can only order from one restaurant at a time");

        return prev;
      }

      const existing = prev.find((i) => i.id === item.id);

      const qtyChange = item.quantity ? item.quantity : 1;

      if (existing) {
        return prev
          .map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + qtyChange } : i,
          )
          .filter((i) => i.quantity > 0);
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
