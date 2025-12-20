import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:2058/FoodDeliveryApp/api/restaurant/",
});

export const addRestaurant = async (restaurantData) => {
  try {
    const formData = new FormData();
    formData.append("name", restaurantData.name);
    formData.append("location", restaurantData.location);
    formData.append("openTime", restaurantData.openTime);
    formData.append("closeTime", restaurantData.closeTime);
    if (restaurantData.photo) {
      formData.append("photo", restaurantData.photo);
    }
    const response = await api.post("/registerRestaurant", formData);
    return response;
  } catch (error) {
    console.error("Error adding restaurant:", error);
    throw error;
  }
};
