import { Grid, Box, useTheme, useMediaQuery } from "@mui/material";
import ProductList from "../components/ProductList";
import Sort from "../components/Sort";


function Products() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));



  return (
    <Box sx={{ padding: "2rem" }}>
      <Grid container spacing={3}>
        {/* Filter Section */}
       

        {/* Sort and Product List */}
        <Grid item xs={12} sm={8} md={9}>
          <Box sx={{ marginBottom: "2rem" }}>
            
            <Sort />
          </Box>
          <Box>
            <ProductList />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Products;
