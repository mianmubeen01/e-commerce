import React, { use } from "react";
import {
Card,
CardMedia,
CardContent,
Typography,
Button,
Box,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import PriceFormat from "./Helper/PriceFormat";
import APIInstance from "./api/api";
import { useAuth } from "./context/AuthContext";


const Product = ({ id, name, image, price }) => {
const { user } = useAuth(); // Get user role
console.log(user)
const navigate = useNavigate();

const handleDelete = async (productId) => {
  if (!window.confirm("Are you sure you want to delete this product?")) return;
  try {
    await APIInstance.delete(`/products/${productId}/`);
    alert("Product deleted successfully!");
    navigate("/products");
  } catch (err) {
    console.error("Delete failed:", err);
    alert("Failed to delete product.");
  }
};

return (
  <Card
    sx={{
      height: "100%",
      width: "250px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      backgroundColor: "#fff",
      borderRadius: "20px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
      transition: "all 0.3s ease",
      "&:hover": {
        boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
        transform: "translateY(-4px)",
      },
    }}
  >
    {/* Image Section */}
    <Box
      sx={{
        height: "200px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <CardMedia
        component="img"
        image={image}
        alt={name}
        sx={{
          maxHeight: "100%",
          maxWidth: "100%",
          objectFit: "contain",
        }}
      />
    </Box>

    {/* Content Section */}
    <CardContent
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "1rem",
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: 500,
          fontSize: "1rem",
          textTransform: "capitalize",
          mb: 1,
        }}
        noWrap
        title={name}
      >
        {name}
      </Typography>

      <Typography
        variant="h6"
        sx={{ color: "#B12704", fontWeight: 700, mb: 2 }}
      >
        <PriceFormat price={price} />
      </Typography>

      <Button
        variant="contained"
        component={Link}
        to={`/singlepage/${id}`}
        fullWidth
        sx={{
          backgroundColor: "rgb(104, 118, 223)",
          color: "#fff",
          fontWeight: 600,
          borderRadius: "6px",
          "&:hover": {
            backgroundColor: "#F7CA00",
            color: "#111",
          },
        }}
      >
        View Details
      </Button>

      {/* Admin Only: Edit/Delete Buttons */}
      {user && user.is_staff && (
        <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
          <Button
            component={Link}
            to={`/edit-product/${id}`}
            variant="outlined"
            color="primary"
            fullWidth
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => handleDelete(id)}
            fullWidth
          >
            Delete
          </Button>
        </Box>
      )}
    </CardContent>
  </Card>
);
};

export default Product;
