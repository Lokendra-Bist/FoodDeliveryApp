import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";

import { verifyEsewaPaymentAPI } from "../../api/paymentApi";
import { useCart } from "../../context/CartContext";

export const PaymentSuccess = () => {
  const [params] = useSearchParams();

  const { fetchCart } = useCart();

  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const data = params.get("data");

        if (!data) {
          Swal.fire({
            icon: "error",
            title: "Invalid Payment",
            text: "Payment response not found",
          });

          return;
        }

        const response = await verifyEsewaPaymentAPI(data);
        await fetchCart();

        Swal.fire({
          icon: "success",
          title: "Payment Successful",
          text: response.data,
          showCancelButton: true,
          confirmButtonText: "View Orders",
          cancelButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/my-orders");
          } else {
            navigate("/");
          }
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Payment Failed",
          text: error.response?.data || "Payment Verification Failed",
          confirmButtonText: "Back To Cart",
        }).then(() => {
          navigate("/cart");
        });
      }
    };

    verifyPayment();
  }, [params, navigate]);

  return null;
};
