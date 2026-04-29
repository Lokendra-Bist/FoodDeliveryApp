import api from "./axios";

export const addRestaurant = async (restaurantData) => {
  try {
    const formData = new FormData();
    const { coverPhoto, restaurantPhoto, ...restaurantInfo } = restaurantData;
    formData.append(
      "restaurant",
      new Blob([JSON.stringify(restaurantInfo)], { type: "application/json" }),
    );

    coverPhoto && formData.append("coverPhoto", coverPhoto);
    restaurantPhoto && formData.append("restaurantPhoto", restaurantPhoto);

    const response = await api.post("/restaurant/registerRestaurant", formData);
    return response;
  } catch (error) {
    console.error("Error adding restaurant:", error);
    throw error;
  }
};

export const getAllRestaurants = async () => {
  try {
    const response = await api.get("/restaurant/getAllRestaurant");
    return response.data;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
};

export const getRestaurantById = async (id) => {
  try {
    const response = await api.get(`/restaurant/getRestaurantById/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching restaurant by ID:", error);
    throw error;
  }
};

export const updateRestaurant = async (id, restaurantData) => {
  try {
    const formData = new FormData();
    const { coverPhoto, restaurantPhoto, ...restaurantInfo } = restaurantData;
    formData.append(
      "restaurant",
      new Blob([JSON.stringify(restaurantInfo)], { type: "application/json" }),
    );

    coverPhoto && formData.append("coverPhoto", coverPhoto);
    restaurantPhoto && formData.append("restaurantPhoto", restaurantPhoto);

    const response = await api.put(`/restaurant/update/${id}`, formData);
    return response.data;
  } catch (error) {
    console.error("Error updating restaurant:", error);
    throw error;
  }
};

export const deleteRestaurant = async (id) => {
  try {
    const response = await api.delete(`/restaurant/deleteRestaurant/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting restaurant:", error);
    throw error;
  }
};
