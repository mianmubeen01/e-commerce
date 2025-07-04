import React from 'react';
import { Box, Typography, Button, Container, Grid, TextField, Divider } from '@mui/material';
import { FaFacebookF, FaInstagramSquare, FaLinkedin } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: '#0a1345', color: 'white', mt: 12 }}>

      {/* Top contact prompt */}
      <Box
        sx={{
          maxWidth: '60vw',
          mx: 'auto',
          p: { xs: 4, sm: 8 },
          backgroundColor: '#f5f5f5',
          borderRadius: 2,
          boxShadow: 'rgba(0, 0, 0, 0.15) 0px 1px 4px',
          transform: { md: 'translateY(50%)', xs: 'translateY(0%)' },
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
          <Grid item xs={12} md={6}>
            <Typography variant="h5" color="black" fontWeight="bold">
              Ready to get started
            </Typography>
            <Typography variant="h5" color="black" fontWeight="bold">
              Talk to us
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'center', md: 'right' } }}>
            <Button
              variant="contained"
              component={NavLink}
              to="/"
              sx={{
                backgroundColor: 'rgb(10, 20, 77)',
                color: '#fff',
                '&:hover': { backgroundColor: 'primary.dark' },
              }}
            >
              Get Started
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Footer main content */}
      <Box sx={{ pt: { xs: 10, md: 20 }, pb: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {/* About */}
            <Grid item xs={12} md={3}>
              <Typography variant="h6" gutterBottom>
                Mubeen Tanveer
              </Typography>
              <Typography variant="body2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </Typography>
            </Grid>

            {/* Subscribe */}
            <Grid item xs={12} md={3}>
              <Typography variant="h6" gutterBottom>
                Subscribe for more discount
              </Typography>
              <Box component="form" noValidate autoComplete="off">
                <TextField
                  type="email"
                  placeholder="Your email"
                  fullWidth
                  size="small"
                  sx={{ mb: 1, bgcolor: 'white', borderRadius: 1 }}
                />
                <Button variant="contained" fullWidth>
                  Subscribe
                </Button>
              </Box>
            </Grid>

            {/* Social Icons */}
            <Grid item xs={12} md={3}>
              <Typography variant="h6" gutterBottom>
                Follow Us
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                {[FaFacebookF, FaInstagramSquare, FaLinkedin].map((Icon, index) => (
                  <Box
                    key={index}
                    sx={{
                      p: 1,
                      borderRadius: '50%',
                      border: '2px solid white',
                      cursor: 'pointer',
                    }}
                  >
                    <Icon style={{ fontSize: '24px', color: 'white' }} />
                  </Box>
                ))}
              </Box>
            </Grid>

            {/* Contact */}
            <Grid item xs={12} md={3}>
              <Typography variant="h6" gutterBottom>
                Call Us
              </Typography>
              <Typography variant="body1">+92 3204887480</Typography>
            </Grid>
          </Grid>

          {/* Footer bottom section */}
          <Box sx={{ mt: 8 }}>
            <Divider sx={{ borderColor: 'white', mb: 2 }} />
            <Grid container justifyContent="space-between">
              <Grid item>
                <Typography variant="body2">
                  © {new Date().getFullYear()} Copy Right Mian Mubeen
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" component="span" sx={{ mr: 2 }}>
                  Privacy Policy
                </Typography>
                <Typography variant="body2" component="span">
                  Terms & Conditions
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
