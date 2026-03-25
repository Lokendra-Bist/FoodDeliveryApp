import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:2058/FoodDeliveryApp/api/category",
});

export const addNewCategory = async (categoryData) => {
  try {
    const response = await api.post("saveCategory", categoryData);
    return response.data;
  } catch (error) {
    console.error("Error adding category:", error);
    throw error;
  }
};

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
      error,
    );
    throw error;
  }
};

export const deleteCategory = async (categoryId) => {
  try {
    const response = await api.delete(`deleteCategory/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting category with ID ${categoryId}:`, error);
    throw error;
  }
};

export const updateCategory = async (categoryId, categoryData) => {
  try {
    const response = await api.put(
      `updateCategory/${categoryId}`,
      categoryData,
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating category with ID ${categoryId}:`, error);
    throw error;
  }
};

export const getAllCategoriesByPagination = async (page, size, search) => {
  const res = await api.get("/getCategories", {
    params: {
      page,
      size,
      search,
    },
  });

  return res.data;
};
