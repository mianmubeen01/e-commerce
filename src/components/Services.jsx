import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import GppGoodIcon from '@mui/icons-material/GppGood';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import CreditScoreIcon from '@mui/icons-material/CreditScore';

const ServiceCard = ({ icon: Icon, title }) => {
  return (
    <Box
      sx={{
        backgroundColor: '#f5f5f5',
        borderRadius: 3,
        p: 4,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
      }}
    >
      <Box
        sx={{
          backgroundColor: '#fff',
          borderRadius: '50%',
          padding: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon sx={{ fontSize: 40, color: '#6C63FF' }} />
      </Box>
      <Typography variant="body1" fontWeight="500">
        {title}
      </Typography>
    </Box>
  );
};

const Service = () => {
  return (
    <Box sx={{ py: 10, px: { xs: 2, md: 8 } }}>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={3}>
          <ServiceCard icon={LocalShippingIcon} title="Super Fast and Free Delivery" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <ServiceCard icon={GppGoodIcon} title="Non-contact Shipping" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <ServiceCard icon={CurrencyExchangeIcon} title="Money-back Guaranteed" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <ServiceCard icon={CreditScoreIcon} title="Super Secure Payment System" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Service;
