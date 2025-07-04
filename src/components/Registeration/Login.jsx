import { useEffect, useState } from 'react';
import {  TextField,  Button,  Typography,  Box,  Link as MuiLink,  useMediaQuery,  useTheme,  Paper,} from '@mui/material';
import { useNavigate, NavLink } from 'react-router-dom';
import APIInstance from '../api/api';
import { useAuth } from "../context/AuthContext";
import { useCartContext } from "../context/CartContext";

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const { fetchUser } = useAuth();
  const { fetchCartFromBackend } = useCartContext();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await APIInstance.post('login/', form);
      localStorage.setItem('access', res.data.access);
      localStorage.setItem('refresh', res.data.refresh);
      await fetchUser()
      await fetchCartFromBackend();
      window.dispatchEvent(new Event('authChanged'));
      setForm({ username: '', password: '' });
      navigate('/');
    } catch (err) {
      alert('Login failed');
    }
  };
  
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: '100%',
          maxWidth: 1000,
          display: 'flex',
          flexDirection: isSmallScreen ? 'column' : 'row',
          overflow: 'hidden',
          borderRadius: '20px',
        }}
      >
        {/* Illustration Area */}
        <Box
          sx={{
            flex: 1,
            background: 'linear-gradient(to bottom right, #a8edea, #fed6e3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 4,
          }}
        >
          <Box
            component="img"
            src="images/logo.png" // Replace with your image path
            alt="Login Illustration"
            sx={{
              maxWidth: '80%',
              height: 'auto',
            }}
          />
        </Box>

        {/* Login Form Area */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 4,
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 400 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Login
            </Typography>
            <form onSubmit={handleLogin}>
              <TextField
                name="username"
                label="username"
                fullWidth
                margin="normal"
                value={form.username}
                onChange={handleChange}
                required
              />
              <TextField
                name="password"
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                value={form.password}
                onChange={handleChange}
                required
              />
              <Box textAlign="right" mt={1} mb={2}>
                <MuiLink component={NavLink} to="/forgot-password" underline="hover">
                  Forgot your password?
                </MuiLink>
              </Box>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                sx={{ borderRadius: 20 }}
              >
                Login
              </Button>
            </form>
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              Don’t have an account?{' '}
              <MuiLink component={NavLink} to="/signup" underline="hover">
                Sign up
              </MuiLink>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
