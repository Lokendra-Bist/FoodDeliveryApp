import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:2058/FoodDeliveryApp/api/menuItem",
});

export const addMenuItem = async (menuItem) => {
  try {
    const data = new FormData();
    data.append("name", menuItem.name);
    data.append("description", menuItem.description);
    data.append("price", menuItem.price);
    data.append("discountPrice", menuItem.discountPrice);
    data.append("categoryId", menuItem.categoryId);
    data.append("restaurantId", menuItem.restaurantId);
    data.append("foodType", menuItem.foodType);
    if (menuItem.image) {
      data.append("image", menuItem.image);
    }
    const response = await api.post("addMenuItem", data);
    return response.data;
  } catch (error) {
    console.error("Error adding menu item:", error);
    throw error;
  }
};

export const getMenuItemsByRestaurantIdAndCategoryId = async (
  restaurantId,
  categoryId,
) => {
  try {
    const response = await api.get(
      `/restaurant/${restaurantId}/category/${categoryId}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching menu items:", error);
    throw error;
  }
};

export const getAllMenuItems = async () => {
  try {
    const response = await api.get("/getAllMenuItems");
    return response.data;
  } catch (error) {
    console.error("Error fetching all menu items:", error);
    throw error;
  }
};

export const getMenuItemByRestaurant = async (restaurantId) => {
  try {
    const response = await api.get(`/restaurant/${restaurantId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching menu items by restaurant:", error);
    throw error;
  }
};

export const deleteMenuItem = async (menuId) => {
  try {
    const response = await api.delete(`/delete/${menuId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting menu item:", error);
    throw error;
  }
};

export const updateMenuItemById = async (menuId, menuItem) => {
  try {
    const data = new FormData();
    data.append("name", menuItem.name);
    data.append("description", menuItem.description);
    data.append("price", menuItem.price);
    data.append("discountPrice", menuItem.discountPrice);
    data.append("categoryId", menuItem.categoryId);
    data.append("restaurantId", menuItem.restaurantId);
    data.append("foodType", menuItem.foodType);
    if (menuItem.image) {
      data.append("image", menuItem.image);
    }
    const response = await api.put(`/update/${menuId}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating menu item:", error);
    throw error;
  }
};

export const getMenuItems = async (page, size, search) => {
  try {
    const response = await api.get("/getMenuItems", {
      params: {
        page,
        size,
        search,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching menu item:", error);
    throw error;
  }
};

export const getMenuItem = async ({
  page,
  size,
  search,
  foodType,
  sortBy,
  sortDir,
}) => {
  const response = await api.get("/getMenuItem", {
    params: { page, size, search, foodType, sortBy, sortDir },
  });
  return response.data;
};
