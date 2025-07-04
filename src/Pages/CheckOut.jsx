import { useState } from "react";
import { Box, Container, Typography, TextField, Button, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../components/context/CartContext";
import APIInstance from "../components/api/api";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51Rfzn0INO62sS5OKbDjIfl6vOXXKuLGc0dmfikra0FlYt2hASPZHM9tbX1yKxkPJdHYovw80LUW3cGmwMs5FK1GQ00KTK9Tktv");

const Checkout = () => {
  const { cart, total_price, shipping_fee, clearCart } = useCartContext();
  const [form, setForm] = useState({
    address: "",
    phone_number: "",
    payment_method: "cash",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const paymentOptions = [
    { value: "cash", label: "Cash on Delivery" },
    { value: "bank", label: "Bank Transfer (Stripe)" },
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOrder = async (e) => {
    e.preventDefault();
    setError("");

    if (form.payment_method === "bank") {
      // Stripe payment flow
      try {
        const stripe = await stripePromise;

        const { data } = await APIInstance.post("stripe/", {
          product_name: "Order Payment",
          amount: (total_price + shipping_fee),
          currency: "pkr",
          quantity: 1,
          success_url:
            "http://localhost:5173/success?address=" +
            form.address +
            "&phone=" +
            form.phone_number +
            "&method=bank",
          cancel_url: "http://localhost:5173/cart",
        });

        if (data.id) {
          stripe.redirectToCheckout({ sessionId: data.id });
        } else {
          setError("Stripe session failed.");
        }
      } catch (err) {
        console.error(err);
        setError("Stripe payment error.");
      }
    } else {
      // Cash on Delivery flow
      try {
        await APIInstance.post("/orders/", form);
        alert("Order placed successfully!");
        clearCart();
        navigate("/products");
      } catch (err) {
        console.error(err);
        setError("Order failed.");
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Checkout</Typography>
      <form onSubmit={handleOrder}>
        <TextField
          label="Address"
          name="address"
          fullWidth
          required
          margin="normal"
          value={form.address}
          onChange={handleChange}
        />
        <TextField
          label="Phone Number"
          name="phone_number"
          fullWidth
          required
          margin="normal"
          value={form.phone_number}
          onChange={handleChange}
        />
        <TextField
          select
          label="Payment Method"
          name="payment_method"
          fullWidth
          required
          margin="normal"
          value={form.payment_method}
          onChange={handleChange}
        >
          {paymentOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Place Order
        </Button>
      </form>
    </Container>
  );
};

export default Checkout;
