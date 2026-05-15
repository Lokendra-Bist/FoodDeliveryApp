import api from "./axios";

export const addToCartAPI = async (item) => {
  try {
    const response = await api.post("/api/cart/addCart", item);
    return response;
  } catch (error) {
    console.log("Error while adding to the cart", error);
    throw error;
  }
};

export const getCartAPI = async () => {
  try {
    const response = await api.get("/api/cart/getCart");
    return response;
  } catch (error) {
    console.log("Error while fetching the cart", error);
    throw error;
  }
};

export const removeFromCartAPI = async (menuItemId) => {
  try {
    const response = await api.delete(`/api/cart/remove/${menuItemId}`);
    return response;
  } catch (error) {
    console.log("Error while removing from the cart", error);
    throw error;
  }
};

export const clearCartAPI = async () => {
  try {
    const response = await api.delete("/api/cart/clear");
    return response;
  } catch (error) {
    console.log("Error while clearing the cart", error);
    throw error;
  }
};
