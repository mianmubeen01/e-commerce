import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import APIInstance from "../api/api";

const VerifyOtp = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [message, setMessage] = useState("");
  const [resendMessage, setResendMessage] = useState("");
  const [resendTimer, setResendTimer] = useState(120);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const email = state?.email;

  const inputsRef = useRef([]);

  // Handle OTP input change
  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    if (enteredOtp.length < 4) return setMessage("Enter full OTP");
    setLoading(true);
    try {
      const res = await APIInstance.post("/verify-otp/", {
        email,
        otp: enteredOtp,
      });
      const uid = res.data.uid;
      navigate("/reset-password", { state: { uid } });
    } catch (err) {
      setMessage("Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      await APIInstance.post("/resend-otp/", { email });
      setResendMessage("OTP has been resent to your email.");
      setResendTimer(120);
    } catch {
      setResendMessage("Failed to resend OTP.");
    }
  };

  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => setResendTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Paper
        elevation={3}
        sx={{
          borderRadius: 4,
          p: 4,
          textAlign: "center",
          background: "#fff",
        }}
      >


        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Enter verification code
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          We've sent a code to <b>{email}</b>
        </Typography>

        {/* OTP Boxes */}
        <Box
          component="form"
          onSubmit={handleVerify}
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 1.5,
            mb: 2,
          }}
        >
          {otp.map((digit, idx) => (
            <TextField
              key={idx}
              inputRef={(el) => (inputsRef.current[idx] = el)}
              inputProps={{
                maxLength: 1,
                style: {
                  textAlign: "center",
                  fontSize: "1.5rem",
                  width: "3rem",
                  height: "3rem",
                },
              }}
              value={digit}
              onChange={(e) => handleOtpChange(e.target.value, idx)}
              variant="outlined"
            />
          ))}
        </Box>

        {/* Resend */}
        <Typography variant="body2" mb={2}>
          Didn't get a code?{" "}
          <Button
            onClick={handleResendOtp}
            disabled={resendTimer > 0}
            size="small"
          >
            Click to resend
          </Button>
          {resendTimer > 0 && (
            <Typography fontSize="13px" color="text.secondary">
              Resend in {resendTimer}s
            </Typography>
          )}
        </Typography>

        {/* Action Buttons */}
        <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
          <Button
            variant="outlined"
            onClick={() => navigate(-1)}
            sx={{ px: 4, py: 1.2 }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            type="submit"
            onClick={handleVerify}
            disabled={loading}
            sx={{ px: 4, py: 1.2 }}
          >
            {loading ? "Verifying..." : "Verify"}
          </Button>
        </Stack>

        {/* Messages */}
        {message && (
          <Typography mt={2} color="error" fontWeight={500}>
            {message}
          </Typography>
        )}
        {resendMessage && (
          <Typography mt={1} color="primary" fontWeight={500}>
            {resendMessage}
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default VerifyOtp;
