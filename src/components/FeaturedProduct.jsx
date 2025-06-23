import React from 'react';
import { useProductContext } from './context/ProductContext';
import Product from './Product';
import { Container, Grid, Typography, CircularProgress, Box } from '@mui/material';

const FeaturedProduct = () => {
  const { isLoading, featuredProducts } = useProductContext();

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ py: 10, bgcolor: 'background.default' }}>
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        <Typography variant="h6" sx={{ color: 'primary.main', mb: 1 }}>
          Check Now
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>
          Our Featured Products
        </Typography>

        <Grid container spacing={4}>
          {featuredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Product {...product} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeaturedProduct;
