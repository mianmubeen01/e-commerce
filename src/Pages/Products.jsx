import { Grid, Box, useTheme, useMediaQuery } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Product from "../components/Product";
import Sort from "../components/Sort";
import ProductList from "../components/ProductList";

function Products() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/products/")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <Box sx={{ padding: "2rem" }}>
      <Grid container spacing={3}>
        {/* Sort and Product List */}
        <Grid item xs={12} sm={8} md={9} paddingX="2rem">
          <Box sx={{ marginBottom: "2rem" }}>
            <Sort />
          </Box>
          <Box>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                  <ProductList />
                </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Products;
