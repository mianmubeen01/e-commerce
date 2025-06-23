// Contact.jsx (Responsive with MUI)
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  TextareaAutosize,
  useTheme
} from '@mui/material';

function Contact() {
  const theme = useTheme();

  return (
    <Box sx={{ py: { xs: 6, md: 9 }, px: { xs: 2, md: 0 }, textAlign: 'center' }}>
      <Typography
        variant="h4"
        component="h2"
        sx={{
          mb: 4,
          fontWeight: 'bold',
          fontSize: { xs: '1.8rem', md: '2.4rem' }
        }}
      >
        Contact Page
      </Typography>

      {/* Responsive Google Map */}
      <Box
        component="iframe"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3400.771247090425!2d74.45058857545148!3d31.5304421742094!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190effc148cb81%3A0xb120c831648458fd!2sIQ%20Mall!5e0!3m2!1sen!2s!4v1749557618567!5m2!1sen!2s"
        sx={{
          border: 0,
          width: '100%',
          height: { xs: 300, sm: 400, md: 450 },
          borderRadius: 2,
          boxShadow: theme.shadows[2],
          my: { xs: 3, md: 5 }
        }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />

      {/* Contact Form */}
      <Container maxWidth="sm">
        <Box
          component="form"
          method="POST"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            px: { xs: 1, md: 0 }
          }}
        >
          <TextField
            label="Username"
            name="username"
            required
            autoComplete="off"
            fullWidth
          />

          <TextField
            label="Email"
            name="email"
            type="email"
            required
            autoComplete="off"
            fullWidth
          />

          <TextareaAutosize
            minRows={6}
            placeholder="Enter your message"
            name="message"
            required
            style={{
              padding: '1rem',
              borderRadius: '8px',
              fontFamily: 'inherit',
              fontSize: '1rem',
              border: '1px solid #ccc',
              resize: 'none',
              width: '100%'
            }}
          />

          <Button
            variant="contained"
            type="submit"
            sx={{
              py: 1.2,
              textTransform: 'capitalize',
              fontSize: '1rem',
              fontWeight: '500',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                backgroundColor: '#fff',
                color: 'primary.main',
                transform: 'scale(0.95)',
                border: '1px solid',
                borderColor: 'primary.main'
              }
            }}
          >
            Send
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default Contact;
