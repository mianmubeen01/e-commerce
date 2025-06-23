import React from 'react';
import { NavLink } from 'react-router-dom';
import { Grid, Box, Typography, Button } from '@mui/material';
import PriceFormat from './Helper/PriceFormat';

const ListView = ({ products }) => {
  return (
    <Box sx={{ py: 10 }}>
      <Grid
        container
        spacing={4}
        sx={{
          maxWidth: '1200px',
          mx: 'auto',
          px: 2,
        }}
      >
        {products.map((product) => {
          const { id, name, image, price, description } = product;

          return (
            <Grid
              item
              xs={12}
              key={id}
              container
              spacing={2}
              sx={{
                border: '1px solid rgba(170,170,170,0.4)',
                borderRadius: 2,
                p: 2,
              }}
            >
              {/* Product Image */}
              <Grid item xs={12} md={5}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                    position: 'relative',
                    '&:hover img': {
                      transform: 'scale(1.2)',
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: 0,
                      height: '100%',
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      transition: 'width 0.3s ease',
                    },
                    '&:hover::after': {
                      width: '100%',
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={image}
                    alt={name}
                    sx={{
                      width: '90%',
                      height: '20rem',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease',
                      zIndex: 1,
                      mt: 2,
                    }}
                  />
                </Box>
              </Grid>

              {/* Product Details */}
              <Grid item xs={12} md={7}>
                <Box sx={{ px: 2 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 1,
                      textTransform: 'capitalize',
                      fontWeight: 300,
                    }}
                  >
                    {name}
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{ color: 'primary.main', fontWeight: 500 }}
                  >
                    <PriceFormat price={price} />
                  </Typography>

                  <Typography variant="body2" sx={{ mt: 2 }}>
                    {description.slice(0, 90)}...
                  </Typography>

                  <Button
                    component={NavLink}
                    to={`/singleproduct/${id}`}
                    variant="outlined"
                    sx={{
                      mt: 3,
                      borderColor: 'primary.main',
                      color: 'primary.main',
                      textTransform: 'none',
                      '&:hover': {
                        backgroundColor: 'primary.main',
                        color: '#fff',
                      },
                    }}
                  >
                    Read More
                  </Button>
                </Box>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default ListView;
