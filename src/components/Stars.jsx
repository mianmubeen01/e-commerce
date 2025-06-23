import { Box, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

const Stars = ({ stars, reviews }) => {
  const ratingStars = Array.from({ length: 5 }, (_, index) => {
    const number = index + 0.5;
    return (
      <span key={index}>
        {stars >= index + 1 ? (
          <StarIcon sx={{ fontSize: 24, color: "orange" }} />
        ) : stars >= number ? (
          <StarHalfIcon sx={{ fontSize: 24, color: "orange" }} />
        ) : (
          <StarOutlineIcon sx={{ fontSize: 24, color: "orange" }} />
        )}
      </span>
    );
  });

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Box sx={{ display: "flex", gap: 0.5 }}>{ratingStars}</Box>
      <Typography variant="body2" sx={{ ml: 1 }}>
        ({reviews} customer reviews)
      </Typography>
    </Box>
  );
};

export default Stars;
