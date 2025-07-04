
// Pages/Success.jsx
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import APIInstance from "../components/api/api";

const Success = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const placeOrder = async () => {
      const address = searchParams.get("address");
      const phone_number = searchParams.get("phone");
      const payment_method = searchParams.get("method");

      try {
        await APIInstance.post("/orders/", {
          address,
          phone_number,
          payment_method,
          is_paid: true,
        });
        // clearCart();
        alert("Order placed successfully after Stripe payment.");
        navigate("/products");
      } catch (err) {
        console.error(err);
        alert("Payment was successful, but order failed to place.");
        navigate("/cart");
      }
    };

    placeOrder();
  }, [searchParams, navigate]);

  return null;
};

export default Success;
