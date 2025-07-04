import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import PriceFormat from './Helper/PriceFormat';

const ListView = ({ products }) => {
  return (
    <Box sx={{ py: 5, maxWidth: '1100px', mx: 'auto', px: 2 }}>
      {products.map((product) => {
        const { id, name, image, price, description } = product;

        return (
          <Box
            key={id}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 3,
              alignItems: 'center',
              mb: 4,
              p: 2,
              borderRadius: 3,
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              backgroundColor: '#fff',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 6px 16px rgba(0,0,0,0.1)',
              },
            }}
          >
            {/* Image Container */}
            <Box
              sx={{
                width: { xs: '100%', md: '240px' },
                height: '160px',
                borderRadius: 2,
                overflow: 'hidden',
                backgroundColor: '#f0f0f0',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                '&:hover img': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              <Box
                component="img"
                src={image}
                alt={name}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain0',
                  transition: 'transform 0.3s ease',
                }}
              />
            </Box>

            {/* Product Details */}
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h6"
                sx={{ textTransform: 'capitalize', fontWeight: 600, color: 'text.primary' }}
              >
                {name}
              </Typography>

              <Typography
                variant="h6"
                sx={{ color: 'primary.main', fontWeight: 700, mt: 1 }}
              >
                <PriceFormat price={price} />
              </Typography>

              <Typography variant="body2" sx={{ mt: 1.5, color: 'text.secondary', lineHeight: 1.6 }}>
                {description?.slice(0, 140)}...
              </Typography>

              <Button
                component={NavLink}
                to={`/singleproduct/${id}`}
                variant="outlined"
                sx={{
                  mt: 2.5,
                  textTransform: 'none',
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  fontWeight: 500,
                  '&:hover': {
                    backgroundColor: 'primary.main',
                    color: '#fff',
                  },
                }}
              >
                Read More
              </Button>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default ListView;
