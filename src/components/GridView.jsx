import {
  Grid,
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import PriceFormat from "./Helper/PriceFormat";

const GridView = ({ products }) => {
  const theme = useTheme();

  return (
    <Box sx={{ px: {xs: 2, sm: 3, md: 4, lg: 0}, py: { xs: 2, sm: 3, md: 4 }, backgroundColor: "#f3f3f3" }}>
      <Grid container spacing={3}>
        {products.map((product) => {
          const { id, name, image, price } = product;

          return (
            <Grid
              item
              key={id}
              xs={12}
              sm={6}
              md={4}
              
              sx={{ display: "flex" }}
            >
              <Card
                sx={{
                  width: "10",
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "#fff",
                  borderRadius: "8px",
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
                    width: '300px',
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
                      width: { xs: '80%', sm: '60%', md: '100%' },
                      height: 'auto',
                      
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
                      fontWeight: 600,
                      fontSize: "1rem",
                      color: theme.palette.text.primary,
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
                      color: "#111",
                      fontWeight: 600,
                      borderRadius: "6px",
                      "&:hover": {
                        backgroundColor: "#F7CA00",
                      },
                    }}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default GridView;
