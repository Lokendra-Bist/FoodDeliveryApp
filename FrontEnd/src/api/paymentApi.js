import api from "./axios";

export const initiateEsewaPaymentAPI = async (data) => {
  const response = await api.post("/api/payment/esewa/checkOut", data);
  console.log("Response in api", response);

  return response;
};

export const verifyEsewaPaymentAPI = async (data) => {
  const response = await api.get(
    `/api/payment/esewa/verify?data=${encodeURIComponent(data)}`,
  );

  return response;
};
