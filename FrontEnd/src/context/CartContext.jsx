import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  addToCartAPI,
  clearCartAPI,
  getCartAPI,
  removeFromCartAPI,
} from "../api/cartApi";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const { token } = useAuth();

  const fetchCart = async () => {
    try {
      const response = await getCartAPI();
      setCart(response.data.items);
      setTotalAmount(response.data.totalAmount);
    } catch (error) {
      toast.error("Error fetching cart");
    }
  };

  const addToCart = async ({ id, quantity }) => {
    try {
      const response = await addToCartAPI({
        menuItemId: id,
        quantity,
      });

      setCart(response.data.items);
      setTotalAmount(response.data.totalAmount);
      toast.success("Item added to cart");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error Adding item");
    }
  };

  const removeFromCart = async (id) => {
    try {
      const response = await removeFromCartAPI(id);
      console.log(response);

      await fetchCart();
      toast.success("Item removed from cart");
    } catch (error) {
      error.response?.data?.message || "Error removing item";
    }
  };

  const clearCart = async () => {
    try {
      await clearCartAPI();
      setCart([]);
      setTotalAmount(0);
      toast.success("Cart cleared successfully");
    } catch (error) {
      toast.error("Error clearing cart");
    }
  };

  useEffect(() => {
    if (token) {
      fetchCart();
    } else {
      setCart([]);
      setTotalAmount(0);
    }
  }, [token]);

  return (
    <CartContext.Provider
      value={{
        cart,
        totalAmount,
        addToCart,
        removeFromCart,
        clearCart,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
