// src/components/NavBar.js
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  AppBar, Box, IconButton, Toolbar, Drawer, List, ListItemButton, ListItemText,
  Badge, useTheme, useMediaQuery
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import Search from '../components/Search';
import { useCartContext } from './context/CartContext';
import NavLinks, { getNavLinks } from './Nav_Links';
import APIInstance from '../components/api/api';

const NavBar = () => {
  const { total_item } = useCartContext();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("access"));
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const updateAuthStatus = async () => {
      const token = localStorage.getItem("access");
      setIsAuthenticated(!!token);

      if (token) {
        try {
          const res = await APIInstance.get("/me/");
          setIsAdmin(res.data.is_staff);
        } catch (err) {
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
    };

    updateAuthStatus();
    window.addEventListener("authChanged", updateAuthStatus);
    return () => window.removeEventListener("authChanged", updateAuthStatus);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    window.dispatchEvent(new Event("authChanged"));
    window.location.replace("/login");
  };

  //  Reuse same function to get drawer links
  const drawerLinks = getNavLinks(isAuthenticated, isAdmin);

  const drawer = (
    <Box sx={{ width: 200, bgcolor: 'background.paper', p: 2 }}>
      <IconButton onClick={handleDrawerToggle}>
        <CloseIcon />
      </IconButton>
      <List>
        {drawerLinks.map((link) =>
          link.label === 'Logout' ? (
            <ListItemButton key={link.label} onClick={handleLogout}>
              <ListItemText primary={link.label} />
            </ListItemButton>
          ) : (
            <ListItemButton
              key={link.label}
              component={NavLink}
              to={link.path}
            >
              <ListItemText primary={link.label} />
            </ListItemButton>
          )
        )}
        <ListItemButton component={NavLink} to="/cart">
          <Badge badgeContent={total_item} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{ justifyContent: 'space-between', minHeight: { xs: 50, md: 56 }, }}>
          <NavLink to="/">
            <img src="/images/logo.png" alt="Logo" style={{ height: 130, width: 150 }} />
          </NavLink>

        {location.pathname === "/products" && (
          <Box sx={{ flexGrow: 1, maxWidth: 400, mt: 1, pl:8, }}>
            <Search />
          </Box>
        )}
          

          {!isMobile ? (
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <NavLinks isAuthenticated={isAuthenticated} isAdmin={isAdmin} handleLogout={handleLogout} />
              <NavLink to="/cart" style={{ color: 'black' }}>
                <Badge badgeContent={total_item} color="primary">
                  <ShoppingCartIcon />
                </Badge>
              </NavLink>
            </Box>
          ) : (
            <IconButton onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

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
