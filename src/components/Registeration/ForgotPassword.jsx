// src/pages/ForgotPassword.jsx
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { useState } from "react";
import APIInstance from "../api/api";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await APIInstance.post("/forgot-password/", { email });
      setMessage(res.data.message);
      setTimeout(() => {
        navigate("/verify-otp", { state: { email } });
      }, 1500);
    } catch (err) {
      setMessage("Failed to send OTP.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Forgot Password
        </Typography>
        <Typography variant="body1" mb={3}>
          Enter your registered email to receive an OTP.
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 3 }}
          />
          <Button fullWidth variant="contained" type="submit" sx={{ py: 1.5 }}>
            Send OTP
          </Button>
        </form>

        {message && (
          <Typography mt={3} color="primary" fontWeight={500}>
            {message}
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default ForgotPassword;
