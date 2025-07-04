import { Box, Container, Typography, Grid, Divider, useTheme, Button } from "@mui/material";
import { useCartContext } from "../components/context/CartContext";
import CartItems from "../components/CartItems";
import { NavLink } from "react-router-dom";
import PriceFormat from "../components/Helper/PriceFormat";

const Cart = () => {
  const { cart, clearCart, total_price, shipping_fee } = useCartContext();

  if(cart.length == 0){
    return (<>
    <Box sx={{ textAlign: 'center', mt: 10 }}>
      <Typography variant="h2" gutterBottom>
        Cart is Empty
      </Typography>

      <NavLink to="/products">
        <Button variant="contained">
          <Typography variant="h4">Go Shopping</Typography>
        </Button>
      </NavLink>
    </Box>
          </>
  )}

  const theme = useTheme();

  return (
    <Box sx={{ py: 9 }}>
      <Container maxWidth="lg">
        <Grid container spacing={10} alignItems="center" textAlign="center">
          <Grid item xs={3} sm={3} md={3} lg={3}>
            <Typography variant="subtitle1" fontWeight="bold">
              Item
            </Typography>
          </Grid>
          <Grid item xs={0} sm={2} md={2} lg={2} display={{ xs: "none", sm: "block" }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Price
            </Typography>
          </Grid>
          <Grid item xs={3} sm={2} md={2} lg={2}>
            <Typography variant="subtitle1" fontWeight="bold">
              Quantity
            </Typography>
          </Grid>
          <Grid item xs={0} sm={3} md={3} lg={3} display={{ xs: "none", sm: "block" }}>
            <Typography variant="subtitle1" fontWeight="bold">
              Subtotal
            </Typography>
          </Grid>
          <Grid item xs={6} sm={2} md={2} lg={2}>
            <Typography variant="subtitle1" fontWeight="bold">
              Remove
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* You can map cart items here if needed */}
        {cart.map((curElem)=>{
          return(
            <CartItems key={curElem.id} {...curElem} />
          )
        })}
        <Divider/>
        
        <Box sx={{display: 'flex',
          justifyContent: 'space-between',
         }}>
        <NavLink to="/products">
          <Button variant="contained"> Continue Shopping</Button>
        </NavLink>

        <Button variant="contained" color="error" onClick={clearCart}>
            Clear Cart 
        </Button>
        </Box>
        {/* Example for Total Section (Responsive) */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: { xs: "flex-start", md: "flex-end" },
            mt: 6,
          }}
        >
          <Box
            sx={{
              border: "1px solid #f0f0f0",
              width: { xs: "100%", md: "auto" },
              p: 3,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              backgroundColor: "#fafafa",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography>Subtotal:</Typography>
              <Typography fontWeight="bold" color={theme.palette.text.primary}>
                <PriceFormat price={total_price}/>
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography>Shipping:</Typography>
              <Typography fontWeight="bold" color={theme.palette.text.primary}>
                <PriceFormat price={shipping_fee}/>
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography>Total:</Typography>
              <Typography fontWeight="bold" color={theme.palette.text.primary}>
                <PriceFormat price={shipping_fee + total_price}/>
              </Typography>
            </Box>
            <NavLink to="/checkout">
            <Button variant="contained">CheckOut</Button>
            </NavLink>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Cart;
