import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

const brands = [
  './images/bird-colorful.avif',
  './images/gradient-gold.avif',
  './images/indonesian-halal.avif',
  './images/elite.avif',
  './images/flat.avif'
];

const Trusted = () => {
  return (
    <Box sx={{ py: 12, backgroundColor: (theme) => theme.palette.background.default }}>
      <Box sx={{ maxWidth: '1200px', mx: 'auto', px: 2 }}>
        <Typography
          variant="h5"
          sx={{ textAlign: 'center', textTransform: 'capitalize', fontWeight: 'bold', color: (theme) => theme.palette.text.primary }}
        >
          Trusted By 1000+ Companies
        </Typography>

        <Grid
          container
          spacing={4}
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 4, textAlign: 'center' }}
        >
          {brands.map((src, index) => (
            <Grid item xs={6} sm={4} md={2.4} key={index}>
              <Box
                component="img"
                src={src}
                alt={`trusted-brand-${index}`}
                sx={{ maxWidth: '100px', height: '100px' }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Trusted;
