import { useState } from 'react';
import { TextField,  Button,  Typography,  Box,  useTheme,  useMediaQuery,  Paper,  Link as MuiLink} from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import APIInstance from '../api/api';

const Signup = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await APIInstance.post('register/', form);
      alert('Registered Successfully!');
      setForm({ username: '', email: '', password: '' });
      navigate('/login');
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        setError(JSON.stringify(error.response.data));
      } else {
        setError('Registration failed. Please try again.');
      }
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
            src="/images/logo.png" // Update this path as needed
            alt="Signup Illustration"
            sx={{
              maxWidth: '80%',
              height: 'auto',
            }}
          />
        </Box>

        {/* Signup Form Area */}
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
              Sign Up
            </Typography>

            {error && (
              <Box sx={{ color: 'red', mb: 2 }}>
                {error}
              </Box>
            )}

            <form onSubmit={handleSubmit}>
              <TextField
                name="username"
                label="Username"
                fullWidth
                margin="normal"
                onChange={handleChange}
                value={form.username}
                required
              />
              <TextField
                name="email"
                label="Email"
                type="email"
                fullWidth
                margin="normal"
                onChange={handleChange}
                value={form.email}
                required
              />
              <TextField
                name="password"
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                onChange={handleChange}
                value={form.password}
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                sx={{ mt: 2, borderRadius: 20 }}
              >
                Sign Up
              </Button>
            </form>

            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              Already have an account?{' '}
              <MuiLink component={NavLink} to="/login" underline="hover">
                Login
              </MuiLink>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Signup;
