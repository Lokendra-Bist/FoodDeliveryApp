import api from "./axios";

export const loginUser = async (loginData) => {
  try {
    const response = await api.post("/auth/login", loginData);
    return response;
  } catch (error) {
    console.error("Failed to login", error);
    throw error;
  }
};

export const registerUser = async (registerData) => {
  try {
    const response = await api.post("/auth/register", registerData);
    return response;
  } catch (error) {
    console.error("Failed to register");
    throw error;
  }
};
