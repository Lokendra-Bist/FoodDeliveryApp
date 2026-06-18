import api from "./axios";

export const submitRestaurantRating = async (ratingData) => {
  try {
    const response = await api.post("/api/ratings/addRating", ratingData);
    return response.data;
  } catch (error) {
    console.error("Error submitting rating:", error);
    throw error;
  }
};
