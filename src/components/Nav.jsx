import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar,Box,IconButton, Toolbar, Typography, Drawer, List, ListItemButton, ListItemText, Badge, useTheme, useMediaQuery} from '@mui/material';
import { LuShoppingCart } from "react-icons/lu";
import { CgClose, CgMenu } from "react-icons/cg";
import Search from "../components/Search";
import { useCartContext } from './context/CartContext';


 
const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
  { label: 'Products', path: '/products' },
];

const NavBar = () => {
  const {total_item} = useCartContext();

  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box
      sx={{
        width: 250,
        height: '100%',
        bgcolor: 'background.paper',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
      role="presentation"
      onClick={handleDrawerToggle}
    >
      <IconButton sx={{ alignSelf: 'flex-end', m: 2 }}>
        <CgClose size={32} />
      </IconButton>
      <List>
        {navLinks.map((item) => (
          <ListItemButton
            key={item.label}
            component={NavLink}
            to={item.path}
            sx={{ justifyContent: 'center' }}
          >
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                fontSize: 20,
                textAlign: 'center',
                textTransform: 'uppercase',
              }}
            />
          </ListItemButton>
        ))}
        <ListItemButton component={NavLink} to="/cart" sx={{ justifyContent: 'center' }}>
          <Badge badgeContent={10} color="secondary">
            <LuShoppingCart size={28} />
          </Badge>
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Left: Logo */}
          <NavLink to="/">
            <img src="/images/logo.avif" alt="Logo" style={{ height: 80, width: 150 }} />
          </NavLink>
          {/* ✅ Add Search Bar Here */}
          <Box sx={{ flexGrow: 1, maxWidth: 400, mt:2.3 }}>
            <Search />
          </Box>


          {/* Right: Navigation */}
          {!isMobile ? (
            <Box sx={{ display: 'flex', gap: 4 }}>
              {navLinks.map((item) => (
                <Typography
                  key={item.label}
                  component={NavLink}
                  to={item.path}
                  sx={{
                    color: 'black',
                    fontWeight: 500,
                    fontSize: '1.1rem',
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                    '&:hover': {
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  {item.label}
                </Typography>
              ))}
              <NavLink to="/cart" style={{ color: 'black' }}>
                <Badge badgeContent={total_item} color="primary">
                  <LuShoppingCart size={28} />
                </Badge>
              </NavLink>
            </Box>
          ) : (
            <IconButton onClick={handleDrawerToggle}>
              <CgMenu size={32} />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer for mobile view */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default NavBar;
