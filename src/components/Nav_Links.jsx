// src/components/Nav_Links.js
import { NavLink } from 'react-router-dom';
import { Typography } from '@mui/material';

const linkStyle = {
  color: 'black',
  fontWeight: 500,
  fontSize: '1.1rem',
  textDecoration: 'none',
  marginRight: '1rem',
};

// ✅ Function to generate all links
export const getNavLinks = (isAuthenticated, isAdmin) => {
  const links = isAdmin
    ? [
        { label: 'Home', path: '/' },
        { label: 'Add Product', path: '/add-product' },
        { label: 'Orders', path: '/admin-order' },
        { label: 'Products', path: '/products' },
      ]
    : [
        { label: 'Home', path: '/' },
        { label: 'About', path: '/about' },
        { label: 'Contact', path: '/contact' },
        { label: 'Products', path: '/products' },
      ];

  if (isAuthenticated) {
    links.push({ label: 'Logout', path: '/logout' });
  } else {
    links.push({ label: 'Login', path: '/login' });
  }

  return links;
};

// ✅ NavLinks component for desktop
const NavLinks = ({ isAuthenticated, isAdmin, handleLogout }) => {
  const links = getNavLinks(isAuthenticated, isAdmin);

  return (
    <>
      {links.map((link) =>
        link.label === 'Logout' ? (
          <Typography
            key={link.label}
            onClick={handleLogout}
            sx={{ ...linkStyle, cursor: 'pointer' }}
          >
            {link.label}
          </Typography>
        ) : (
          <NavLink key={link.label} to={link.path} style={linkStyle}>
            {link.label}
          </NavLink>
        )
      )}
    </>
  );
};

export default NavLinks;
