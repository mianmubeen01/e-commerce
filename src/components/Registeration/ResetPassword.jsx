import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Modal,
} from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import APIInstance from "../api/api";

const ResetPassword = () => {
  const { state } = useLocation();
  const uid = state?.uid;
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [successModal, setSuccessModal] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await APIInstance.post("/reset-password/", {
        uid,
        password,
      });
      setSuccessModal(true); // ✅ Show modal on success
    } catch {
      setError("Failed to reset password.");
    }
  };

  return (
    <>
      {/* Main Password Reset Form */}
      <Container maxWidth="xs" sx={{ mt: 10 }}>
        <Paper
          elevation={3}
          sx={{
            borderRadius: 4,
            p: 4,
            textAlign: "center",
            background: "#fff",
          }}
        >
          {/* You can place logo here */}
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Reset your password
          </Typography>

          <form onSubmit={handleReset}>
            <TextField
              fullWidth
              label="New Password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ my: 2 }}
            />
            <TextField
              fullWidth
              label="Confirm New Password"
              type="password"
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              sx={{ mb: 3 }}
            />
            <Button
              fullWidth
              variant="contained"
              type="submit"
              sx={{ py: 1.5, fontWeight: "bold" }}
            >
              Reset Password
            </Button>
          </form>

          {error && (
            <Typography mt={2} color="error" fontWeight={500}>
              {error}
            </Typography>
          )}
        </Paper>
      </Container>

      {/* ✅ Success Modal after password reset */}
      <Modal open={successModal} onClose={() => setSuccessModal(false)}>
        <Box
          sx={{
            maxWidth: 400,
            mx: "auto",
            mt: "20vh",
            p: 4,
            borderRadius: 3,
            bgcolor: "white",
            boxShadow: 24,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            ✅ Successful password reset!
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            You can now use your new password to login to your account.
          </Typography>
          <Button
            variant="contained"
            fullWidth
            onClick={() => navigate("/login")}
            sx={{ py: 1.2, fontWeight: "bold" }}
          >
            Login
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default ResetPassword;
