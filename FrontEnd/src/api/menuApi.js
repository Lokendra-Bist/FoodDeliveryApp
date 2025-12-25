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
  categoryId
) => {
  try {
    const response = await api.get(
      `/restaurant/${restaurantId}/category/${categoryId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching menu items:", error);
    throw error;
  }
};
