import api from "./axios";

export const loginUser = async (loginData) => {
  try {
    const response = await api.post("/api/auth/login", loginData);
    return response;
  } catch (error) {
    console.error("Failed to login", error);
    throw error;
  }
};

export const registerUser = async (registerData) => {
  try {
    const response = await api.post("/api/auth/register", registerData);
    return response;
  } catch (error) {
    console.error("Failed to register");
    throw error;
  }
};

export const fetchUser = async () => {
  try {
    const response = await api.get("/api/user/get_all_users");
    return response;
  } catch (error) {
    console.error("Failed to fetch user");
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/api/user/delete_user/${id}`);
    return response;
  } catch (error) {
    console.error("Failed to delete user");
    throw error;
  }
};
