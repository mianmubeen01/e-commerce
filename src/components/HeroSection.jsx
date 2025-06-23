import { Box, Grid, Typography, Button as MuiButton } from '@mui/material';
import { NavLink } from 'react-router-dom';

function HeroSection({ myData }) {
  const { name } = myData;

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 }, backgroundColor: '#fff' }}>
      <Box className="container" sx={{ px: { xs: 2, md: 8 } }}>
        <Grid container spacing={6} alignItems="center">
          {/* Left Content */}
          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="subtitle2"
                sx={{ mb: 1, textTransform: 'uppercase', color: '#6C63FF', fontWeight: 600 }}
              >
                Welcome to
              </Typography>
              <Typography
                variant="h2"
                sx={{ fontWeight: 'bold', textTransform: 'capitalize', mb: 2 }}
              >
                {name}
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias atque
                temporibus veniam doloribus libero ad error omnis voluptates animi!
                Suscipit sapiente. 
              </Typography>
              <NavLink to="/">
                <MuiButton
                  variant="contained"
                  sx={{
                    backgroundColor: '#6C63FF',
                    px: 4,
                    py: 1,
                    fontWeight: 500,
                    fontSize: '1rem',
                    '&:hover': {
                      backgroundColor: '#5848d0',
                    },
                  }}
                >
                  Show Now
                </MuiButton>
              </NavLink>
            </Box>
          </Grid>

          {/* Right Image */}
          <Grid item xs={12} md={6}>
            <Box
              component="figure"
              sx={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                '&::after': {
                  content: '""',
                  width: { xs: '80%', md: '90%' },
                  height: { xs: '80%', md: '90%' },
                  backgroundColor: '#c6b8fc',
                  position: 'absolute',
                  top: { xs: '5%', md: '-3rem' },
                  left: { xs: '10%', md: '5%' },
                  zIndex: -1,
                  borderRadius: '0.5rem',
                },
              }}
            >
              <Box
                component="img"
                src="/images/main.avif"
                alt="hero-section-photo"
                sx={{ width: '100%', maxWidth: '500px', height: 'auto' }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default HeroSection;
