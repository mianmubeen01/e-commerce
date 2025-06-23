import { useState } from "react";
import { Box, Button, Typography, IconButton } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CartAmountToggle from "./CartAmountToggle"; // Make sure this exists
import { NavLink } from "react-router-dom";
import { useCartContext } from "./context/CartContext";

const ColorSelect = ({ product }) => {
  const {addtoCart } = useCartContext();

  const { id, colors, stock } = product;
  const [color, setColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);

  const setDecrease = () => {
    setAmount((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const setIncrease = () => {
    setAmount((prev) => (prev < stock ? prev + 1 : stock));
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Typography variant="subtitle1" sx={{ mr: 1 }}>
          Color:
        </Typography>
        {colors.map((curColor, index) => (
          <IconButton
            key={index}
            onClick={() => setColor(curColor)}
            sx={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              backgroundColor: curColor,
              opacity: color === curColor ? 1 : 0.5,
              border: color === curColor ? "2px solid black" : "none",
              "&:hover": {
                opacity: 1,
              },
            }}
          >
            {color === curColor && (
              <CheckIcon sx={{ fontSize: 16, color: "#fff" }} />
            )}
          </IconButton>
        ))}
      </Box>

      <CartAmountToggle
        amount={amount}
        setDecrease={setDecrease}
        setIncrease={setIncrease}
      />
        <Button component={NavLink} to="/cart" variant="contained" color="primary" onClick={()=> addtoCart(id, color, amount,product)}>
            Add To Cart
        </Button>
    </Box>
  );
};

export default ColorSelect;
