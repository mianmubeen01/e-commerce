import { Grid, Box } from "@mui/material";
import Product from "./Product";

const GridView = ({ products }) => {
  return (
    <Box
      sx={{
        px: { xs: 1, sm: 2, md: 4 },
        py: { xs: 2, md: 4 },
        backgroundColor: "#f3f3f3",
      }}
    >
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Product {...product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default GridView;
