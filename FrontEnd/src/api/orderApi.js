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
