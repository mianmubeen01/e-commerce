// UPDATED: AddToCart.jsx
import { useState } from "react";
import { Box, Button } from "@mui/material";
import CartAmountToggle from "./CartAmountToggle";
import { useNavigate } from "react-router-dom";
import APIInstance from "./api/api";
import { useCartContext } from "./context/CartContext"; 

const AddToCart = ({ product }) => {
  const { id, stock } = product;

  const [amount, setAmount] = useState(1);
  const navigate = useNavigate();

  const { fetchCartFromBackend } = useCartContext(); 

  const setDecrease = () => {
    setAmount((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const setIncrease = () => {
    setAmount((prev) => (prev < stock ? prev + 1 : stock));
  };

  const handleAddToCart = async () => {
    try {
      await APIInstance.post("cart/add_item/", {
        product_id: id,
        quantity: amount,
      });

      await fetchCartFromBackend(); //  Sync with backend immediately
      navigate("/cart"); 
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart. Please login again.");
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <CartAmountToggle
        amount={amount}
        setDecrease={setDecrease}
        setIncrease={setIncrease}
      />

      <Button
        variant="contained"
        onClick={handleAddToCart}
        sx={{
          backgroundColor: "rgb(33, 6, 88)",
          color: "white",
          textTransform: "uppercase",
          fontWeight: 600,
          '&:hover': {
            backgroundImage:
              "linear-gradient(to right,rgb(28, 36, 187),rgb(21, 28, 72))",
          },
        }}
      >
        Add To Cart
      </Button>
    </Box>
  );
};

export default AddToCart;
