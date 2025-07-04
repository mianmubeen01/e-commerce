import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  CircularProgress,
} from "@mui/material";
import APIInstance from "./api/api";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    APIInstance.get(`/products/${id}/`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch product", err);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("description", product.description || "");
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      await APIInstance.patch(`/products/${id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/products");
    } catch (err) {
      console.error("Failed to update product", err);
      console.log("Backend response error: ", err.response?.data);
    }
  };

  if (loading) return <Box textAlign="center" mt={4}><CircularProgress /></Box>;
  if (!product) return <Typography>Error loading product</Typography>;

  return (
    <Box maxWidth={600} mx="auto" mt={5} px={2}>
      <Typography variant="h5" gutterBottom>Edit Product</Typography>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <Stack spacing={2}>
          <TextField
            label="Product Name"
            name="name"
            value={product.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            value={product.price}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Description"
            name="description"
            value={product.description || ""}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
          />
          <Button variant="outlined" component="label">
            Upload New Image
            <input type="file" hidden onChange={handleImageChange} accept="image/*" />
          </Button>
          {product.image && (
            <img
              src={product.image}
              alt="Current"
              style={{ height: "100px", width: "100px", objectFit: "contain" }}
            />
          )}
          <Button type="submit" variant="contained" color="primary">
            Save Changes
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default EditProduct;
