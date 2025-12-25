import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:2058/FoodDeliveryApp/api/restaurant",
});

export const addRestaurant = async (restaurantData) => {
  try {
    const formData = new FormData();
    const { coverPhoto, restaurantPhoto, ...restaurantInfo } = restaurantData;
    formData.append(
      "restaurant",
      new Blob([JSON.stringify(restaurantInfo)], { type: "application/json" })
    );

    coverPhoto && formData.append("coverPhoto", coverPhoto);
    restaurantPhoto && formData.append("restaurantPhoto", restaurantPhoto);

    const response = await api.post("/registerRestaurant", formData);
    return response;
  } catch (error) {
    console.error("Error adding restaurant:", error);
    throw error;
  }
};

export const getAllRestaurants = async () => {
  try {
    const response = await api.get("/getAllRestaurant");
    return response.data;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
};

export const getRestaurantById = async (id) => {
  try {
    const response = await api.get(`/getRestaurantById/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching restaurant by ID:", error);
    throw error;
  }
};
