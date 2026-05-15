import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const PaymentFailure = () => {
  const navigate = useNavigate();

  useEffect(() => {
    Swal.fire({
      icon: "error",
      title: "Payment Failed",
      text: "Your payment could not be completed.",
      showCancelButton: true,
      confirmButtonText: "Retry Payment",
      cancelButtonText: "Back To Home",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/cart");
      } else {
        navigate("/");
      }
    });
  }, [navigate]);

  return null;
};
