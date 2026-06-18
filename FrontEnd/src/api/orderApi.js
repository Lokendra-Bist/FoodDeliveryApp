import api from "./axios";

export const getOrdersAPI = async (
  page,
  size,
  search,
  orderStatus,
  paymentStatus,
  sortBy,
  sortDir,
) => {
  const response = await api.get("/api/order/get-all-orders", {
    params: {
      page,
      size,
      search,
      orderStatus,
      paymentStatus,
      sortBy,
      sortDir,
    },
  });

  return response.data;
};

export const getOrderByUserId = async () => {
  try {
    const response = await api.get("/api/order/get-orders");
    return response.data;
  } catch (error) {
    console.error("Error fetching order by user ID:", error);
    throw error;
  }
};

export const getOrdersByRestaurant = async (page, size, status) => {
  try {
    const response = await api.get("/api/order/getOrderByRestaurant", {
      params: {
        page,
        size,
        status,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching orders by restaurant:", error);
    throw error;
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await api.put(`/api/order/updateStatus/${orderId}`, {
      status,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
};
