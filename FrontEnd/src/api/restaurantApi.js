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

    const response = await api.post(
      "/api/restaurant/registerRestaurant",
      formData,
    );
    return response;
  } catch (error) {
    console.error("Error adding restaurant:", error);
    throw error;
  }
};

export const getAllRestaurants = async () => {
  try {
    const response = await api.get("/api/restaurant/getAllRestaurant");
    return response.data;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
};

export const getRestaurantById = async (id) => {
  try {
    const response = await api.get(`/api/restaurant/getRestaurantById/${id}`);
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

    const response = await api.put(`/api/restaurant/update/${id}`, formData);
    return response.data;
  } catch (error) {
    console.error("Error updating restaurant:", error);
    throw error;
  }
};

export const deleteRestaurant = async (id) => {
  try {
    const response = await api.delete(`/api/restaurant/deleteRestaurant/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting restaurant:", error);
    throw error;
  }
};

export const getPendingRestaurants = async () => {
  try {
    const response = await api.get("/api/restaurant/getPendingRestaurants");
    return response.data;
  } catch (error) {
    console.error("Error fetching pending restaurants:", error);
    throw error;
  }
};

export const approveRestaurant = async (id) => {
  try {
    const response = await api.put(`/api/restaurant/approve/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error approving restaurant:", error);
    throw error;
  }
};

export const rejectRestaurant = async (id) => {
  try {
    const response = await api.put(`/api/restaurant/reject/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error rejecting restaurant:", error);
    throw error;
  }
};

export const getRestaurantByOwner = async () => {
  try {
    const response = await api.get("/api/restaurant/getRestaurantByOwner");
    return response.data;
  } catch (error) {
    console.error("Error fetching restaurant by owner:", error);
    throw error;
  }
};

export const getRestaurantDashboard = async () => {
  try {
    const response = await api.get("/api/restaurant/dashboard");
    return response.data;
  } catch (error) {
    console.error("Error fetching restaurant dashboard:", error);
    throw error;
  }
};

export const getTopRatedRestaurants = async () => {
  try {
    const response = await api.get("/api/ratings/top-rating");
    return response.data;
  } catch (error) {
    console.error("Error fetching top-rated restaurants:", error);
    throw error;
  }
};
