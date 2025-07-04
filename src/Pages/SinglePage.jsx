import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Grid, Container, CircularProgress, Divider } from '@mui/material';

import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import SecurityIcon from '@mui/icons-material/Security';

import { useProductContext } from '../components/context/ProductContext';
import PageNavigation from '../components/PageNavigation';
import MyImage from '../components/MyImage';
import PriceFormat from '../components/Helper/PriceFormat';
import AddtoCart from '../components/Add to Cart';
import Stars from '../components/Stars';

const API = "http://localhost:8000/api/products/";

function SinglePage() {
  const { getSingleProduct, isSingleLoading, singleProduct } = useProductContext();
  const { id } = useParams();

  useEffect(() => {
    getSingleProduct(`${API}${id}`);
  }, [id]);

  if (isSingleLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
        <CircularProgress size={50} />
      </Box>
    );
  }

  const {
    name,
    company,
    price,
    description,
    category,
    stock,
    stars,
    reviews,
    image,
  } = singleProduct;

  return (
    <Box sx={{ py: 6 }}>
      <PageNavigation title={name} />
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4 }}>
          {/* Left Side: Image */}
          <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <MyImage imgs={[{ url: image }]} />
          </Box>

          {/* Right Side: Product Detail */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" gutterBottom sx={{ textTransform: "capitalize" }}>
              {name}
            </Typography>

            <Typography variant="body2" sx={{ mb: 1 }}>
              <Stars stars={stars} reviews={reviews} />
            </Typography>

            <Typography variant="body1" sx={{ textDecoration: "line-through", color: "gray" }}>
              MRP: <PriceFormat price={price*1.1} />
            </Typography>

            <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
              Deal of the Day: {price} 
            </Typography>

            <Typography variant="body1" sx={{ mb: 3 }}>
              {description}
            </Typography>

            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={6} sm={3}>
                <Box textAlign="center">
                  <LocalShippingIcon fontSize="large" />
                  <Typography variant="body2">Free Delivery</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box textAlign="center">
                  <AutorenewIcon fontSize="large" />
                  <Typography variant="body2">30 Days Replacement</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box textAlign="center">
                  <LocalShippingIcon fontSize="large" />
                  <Typography variant="body2">My Delivered</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box textAlign="center">
                  <SecurityIcon fontSize="large" />
                  <Typography variant="body2">2 Year Warranty</Typography>
                </Box>
              </Grid>
            </Grid>

            <Divider sx={{ mb: 2 }} />

            <Typography variant="body2">
              Available: <strong>{stock > 0 ? "In Stock" : "Not Available"}</strong>
            </Typography>
            <Typography variant="body2">ID: <strong>{id}</strong></Typography>
            <Typography variant="body2">Brand: <strong>{company}</strong></Typography>
            <Typography variant="body2">Category: <strong>{category}</strong></Typography>
            <hr />
            {stock > 0 && <AddtoCart product={singleProduct} />}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default SinglePage;
