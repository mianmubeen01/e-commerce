import { Box, Typography, Grid, IconButton, useMediaQuery, useTheme, Stack} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CartAmountToggle from "./CartAmountToggle";
import PriceFormat from "./Helper/PriceFormat";
import { useCartContext } from "./context/CartContext";

const CartItems = ({ id, name, image, price, amount }) => {
  const { removeItem, setDecrease, setIncrease } = useCartContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return isMobile ? (
    <Box
      sx={{
        mb: 3,
        p: 2,
        border: "1px solid #ddd",
        borderRadius: 2,
        backgroundColor: "#fafafa",
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Box
          component="img"
          src={image}
          alt={name}
          sx={{
            width: 60,
            height: 60,
            objectFit: "contain",
            border: "1px solid #eee",
            borderRadius: 1,
            backgroundColor: "#fff",
          }}
        />
        <Typography fontWeight="bold">{name}</Typography>
      </Stack>

      <Box mt={2}>
        {/* <Typography variant="body2" color="text.secondary">Price</Typography> */}
        <Typography fontWeight="bold">
          <PriceFormat price={price} />
        </Typography>
      </Box>

      <Box mt={2}>
        {/* <Typography variant="body2" color="text.secondary">Quantity</Typography> */}
        <CartAmountToggle
          amount={amount}
          setDecrease={() => setDecrease(id)}
          setIncrease={() => setIncrease(id)}
        />
      </Box>

      <Box mt={2}>
        <Typography variant="body2" color="text.secondary">Subtotal</Typography>
        <Typography fontWeight="bold">
          <PriceFormat price={price * amount} />
        </Typography>
      </Box>

      <Box mt={2}>
        <Typography variant="body2" color="text.secondary">Remove</Typography>
        <IconButton onClick={() => removeItem(id)} sx={{ color: "red" }}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  ) : (
    <Grid
      container
      spacing={3}
      alignItems="center"
      sx={{ borderBottom: "1px solid #ddd", py: 2, textAlign: "center" }}
    >
      <Grid item sm={3}>
        <Box display="flex" alignItems="center" gap={4}>
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
          </Box>
        </Box>
      </Grid>

      <Grid item sm={2}>
        <Typography><PriceFormat price={price} /></Typography>
      </Grid>

      <Grid item sm={2}>
        <CartAmountToggle
          amount={amount}
          setDecrease={() => setDecrease(id)}
          setIncrease={() => setIncrease(id)}
        />
      </Grid>

      <Grid item sm={3}>
        <Typography><PriceFormat price={price * amount} /></Typography>
      </Grid>

      <Grid item sm={2}>
        <IconButton sx={{ color: "red" }} onClick={() => removeItem(id)}>
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default CartItems;
