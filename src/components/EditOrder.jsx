import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box, TextField, Button, Typography, Stack, useMediaQuery,
    FormControlLabel, Checkbox
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import APIInstance from "./api/api";

const EditOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    APIInstance.get(`/orders/${id}/`)
      .then(res => setOrder(res.data))
      .catch(err => console.error("Failed to load order", err));
  }, [id]);

  const handleChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await APIInstance.patch(`/orders/${id}/`, order);
      navigate("/admin-order");
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  if (!order) return <Typography>Loading...</Typography>;

  return (
    <Box
      sx={{
        maxWidth: "600px",
        mx: "auto",
        mt: 4,
        px: isMobile ? 2 : 0,
        width: "100%",
      }}
    >
      <Typography
        variant={isMobile ? "h6" : "h5"}
        gutterBottom
        align={isMobile ? "center" : "left"}
      >
        Edit Order #{id}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Address"
            name="address"
            value={order.address}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Phone Number"
            name="phone_number"
            value={order.phone_number}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Payment Method"
            name="payment_method"
            value={order.payment_method}
            onChange={handleChange}
            fullWidth
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={order.is_paid}
                onChange={(e) =>
                  setOrder({ ...order, is_paid: e.target.checked })
                }
              />
            }
            label="Is Paid"
            />
          <Button
            type="submit"
            variant="contained"
            size={isMobile ? "medium" : "large"}
            fullWidth={isMobile}
          >
            Save Changes
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default EditOrder;
