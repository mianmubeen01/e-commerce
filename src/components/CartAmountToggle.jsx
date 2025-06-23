import { Box, IconButton, Typography } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

const CartAmountToggle = ({ amount, setDecrease, setIncrease }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="flex-start"
      gap={2}
      mt={2}
    >
      <IconButton onClick={setDecrease} color="primary">
        <RemoveIcon />
      </IconButton>

      <Typography variant="h6" sx={{ minWidth: "30px", textAlign: "center" }}>
        {amount}
      </Typography>

      <IconButton onClick={setIncrease} color="primary">
        <AddIcon />
      </IconButton>
    </Box>
  );
};

export default CartAmountToggle;
