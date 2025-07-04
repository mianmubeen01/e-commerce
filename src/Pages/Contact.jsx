import { useState } from 'react';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  TextareaAutosize,
  useTheme,
} from '@mui/material';
import APIInstance from "../components/api/api";

function Contact() {
  const theme = useTheme();

  const [form, setForm] = useState({
    username: '',
    email: '',
    message: '',
  });

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await APIInstance.post('contact/', form); //  API
      setSuccess('Message sent successfully!');
      setForm({ username: '', email: '', message: '' });
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to send message.');
    }
  };

  return (
    <Box sx={{ py: { xs: 6, md: 9 }, px: { xs: 2, md: 0 }, textAlign: 'center' }}>
      <Typography
        variant="h4"
        component="h2"
        sx={{ mb: 4, fontWeight: 'bold', fontSize: { xs: '1.8rem', md: '2.4rem' } }}
      >
        Contact Page
      </Typography>

      {/* Google Map */}
      <Box
        component="iframe"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3400.771247090425!2d74.45058857545148!3d31.5304421742094!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190effc148cb81%3A0xb120c831648458fd!2sIQ%20Mall!5e0!3m2!1sen!2s!4v1749557618567!5m2!1sen!2s"
        sx={{
          border: 0,
          width: '100%',
          height: { xs: 300, sm: 400, md: 450 },
          borderRadius: 2,
          boxShadow: theme.shadows[2],
          my: { xs: 3, md: 5 },
        }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />

      <Container maxWidth="sm">
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
        >
          {success && <Typography sx={{ color: 'green' }}>{success}</Typography>}
          {error && <Typography sx={{ color: 'red' }}>{error}</Typography>}

          <TextField
            label="Name"
            name="name"
            required
            fullWidth
            value={form.name}
            onChange={handleChange}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            required
            fullWidth
            value={form.email}
            onChange={handleChange}
          />
          <TextareaAutosize
            minRows={6}
            name="message"
            required
            placeholder="Enter your message"
            value={form.message}
            onChange={handleChange}
            style={{
              padding: '1rem',
              borderRadius: '8px',
              fontFamily: 'inherit',
              fontSize: '1rem',
              border: '1px solid #ccc',
              resize: 'none',
              width: '100%',
            }}
          />
          <Button type="submit" variant="contained" fullWidth>
            Send
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default Contact;
