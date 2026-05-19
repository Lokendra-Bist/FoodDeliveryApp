import api from "./axios";

export const fetchDashboardStats = async () => {
  try {
    const response = await api.get("/api/admin/dashboard/stats");
    return response;
  } catch (error) {
    error.response &&
      console.error("Error fetching dashboard stats:", error.response.data);
    throw error;
  }
};

export const fetchRecentOrders = async () => {
  try {
    const response = await api.get("/api/admin/dashboard/recent-orders");
    return response;
  } catch (error) {
    error.response &&
      console.error("Error fetching recent orders:", error.response.data);
    throw error;
  }
};
