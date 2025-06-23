import React from "react";
import { NavLink } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from "@mui/material";
import PriceFormat from "./Helper/PriceFormat";

const Product = ({ id, name, image, price, category }) => {
  return (
    <NavLink to={`/singlepage/${id}`} style={{ textDecoration: "none" }}>
      <Card sx={{maxWidth: 345,
          borderRadius: 3,
          boxShadow: 3,
          mx: "auto",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          '&:hover': {
            transform: "scale(1.03)",
            boxShadow: 6,} }}>

        <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            image={image}
            alt={name}
            sx={{ objectFit: "cover",  transition: "transform 0.3s ease",
              '&:hover': {
                transform: "scale(1.05)",
              }, }}
          />
          <CardContent>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              gutterBottom
            >
              {category}
            </Typography>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h6" component="div">
                {name}
              </Typography>
              <Typography variant="body1" color="primary">
                <PriceFormat price={price} />
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </NavLink>
  );
};

export default Product;
