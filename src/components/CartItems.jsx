import { Box, Typography, Grid, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CartAmountToggle from "./CartAmountToggle";
import PriceFormat from "./Helper/PriceFormat";
import { useCartContext } from "./context/CartContext";

const CartItems = ({ id, name, image, price, color, amount }) => {
    const {removeItem, setDecrease, setIncrease} = useCartContext();


  return (
    <Grid
      container
      spacing={7}
      alignItems="center"
      sx={{
        borderBottom: "1px solid #ddd",
        py: 2,
        textAlign: "center",
      }}
    >
      {/* Item (image + name + color) */}
      <Grid item xs={12} sm={3}>
        <Box display="flex" alignItems="center" gap={2} sx={{ml: -7}}>
          <Box
            component="img"
            src={image}
            alt={name}
            sx={{
              width: 60,
              height: 60,
              objectFit: "contain",
              borderRadius: 1,
              border: "1px solid #eee",
              backgroundColor: "#fff",
            }}
          />
          <Box textAlign="left">
            <Typography fontWeight="bold">{name}</Typography>
            <Box display="flex" alignItems="center" gap={1} sx={{mt: 4, ml:-2.2}}>
              <Typography variant="body2">Color:</Typography>
              <Box
                sx={{
                  width: 15,
                  height: 15,
                  borderRadius: "50%",
                  backgroundColor: color,
                  border: "1px solid #00000030",
                }}
              />
            </Box>
          </Box>
        </Box>
      </Grid>

      {/* Price */}
      <Grid item xs={6} sm={2}>
        <Typography>
          <PriceFormat price={price} />
        </Typography>
      </Grid>

      {/* Quantity */}
      <Grid item xs={6} sm={2} sx={{ ml: -3}}>
        <CartAmountToggle
          amount={amount}
          setDecrease={()=>setDecrease(id)}
          setIncrease={()=>setIncrease(id)}
        />
      </Grid>

      {/* Subtotal */}
      <Grid item xs={6} sm={3}>
        <Typography>
          <PriceFormat price={price * amount} />
        </Typography>
      </Grid>

      {/* Remove Icon */}
      <Grid item xs={6} sm={2}>
        <IconButton sx={{ color: "red", ml: 6}}>
          <DeleteIcon  onClick={()=> removeItem(id)}/>
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default CartItems;
