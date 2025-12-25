import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:2058/FoodDeliveryApp/api/category",
});

export const getAllCategories = async () => {
  try {
    const response = await api.get("getAllCategory");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const getCategoryByRestaurantId = async (restaurantId) => {
  try {
    const response = await api.get(`categoryByRestaurant/${restaurantId}`);
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching categories for restaurant ID ${restaurantId}:`,
      error
    );
    throw error;
  }
};
