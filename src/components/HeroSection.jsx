import { Box } from '@mui/material';
import { NavLink } from 'react-router-dom';

function HeroSection() {
  return (
    <NavLink to="/products" style={{ display: 'block' }}>
      <Box
        component="section"
        sx={{
          width: '100vw',
          height: { xs: '300px', sm: '400px', md: '500px' },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          component="video"
          src="/images/bannerV.mp4"
          autoPlay
          muted
          loop
          playsInline
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
        />
      </Box>
    </NavLink>
  );
}

export default HeroSection;
