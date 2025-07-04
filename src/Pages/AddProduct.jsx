import { useState } from 'react';
import { Container, Grid, TextField, Button, Paper, Typography, Checkbox, FormControlLabel } from '@mui/material';
import axios from 'axios';

const AddProduct = () => {
const defaulproduct = {
    name: '',
    description: '',
    category: '',
    price: '',
    stock: '',
    rating: '',
    featured: false,
    image: null,
  }

  const [product, setProduct] = useState(defaulproduct);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setProduct({ ...product, [name]: checked });
    } else if (type === 'file') {
      setProduct({ ...product, image: files[0] });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in product) {
      formData.append(key, product[key]);
    }
    const token = localStorage.getItem("access"); // ✅ Get token

    try {
      await axios.post('http://localhost:8000/api/products/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}` // ✅ SEND TOKEN HERE
          
        },
      });
      alert('Product added successfully!');
      setProduct(defaulproduct)
    } catch (err) {
      console.error(err);
      alert('Failed to add product');
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom>Add New Product</Typography>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField label="Name" name="name" value={product.name} fullWidth onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Category" name="category" value={product.category} fullWidth onChange={handleChange} required />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Description" name="description" value={product.description} fullWidth multiline rows={3} onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField label="Price" name="price" type="number" value={product.price} fullWidth onChange={handleChange} required />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField label="Stock" name="stock" value={product.stock} type="number" fullWidth onChange={handleChange} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField label="Rating" name="rating" value={product.rating} type="number" fullWidth onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox checked={product.featured} onChange={handleChange} name="featured" />}
                label="Featured"
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="outlined" component="label">
                Upload Image
                <input hidden accept="image/*" type="file" name="image" onChange={handleChange} />
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth>Add Product</Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default AddProduct;
