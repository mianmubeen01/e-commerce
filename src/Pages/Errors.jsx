import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Container, Typography, Box } from '@mui/material';

function Errors() {
  return (
    <Container maxWidth="md" sx={{ py: 10, textAlign: 'center' }}>
      <Box>
        <Typography variant="h1" component="h2" sx={{ fontSize: '10rem', fontWeight: 'bold' }}>
          404
        </Typography>
        <Typography variant="h3" component="h3" sx={{ fontSize: '2.5rem', mt: 2 }}>
          You are lost
        </Typography>
        <Typography variant="body1" sx={{ my: 3, fontSize: '1.2rem' }}>
          The page you are looking for does not exist. You may want to try again or go back.
        </Typography>
        <NavLink to="/" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary" size="large">
            Go Back
          </Button>
        </NavLink>
      </Box>
    </Container>
  );
}

export default Errors;
