import { NavLink } from "react-router-dom";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";

const PageNavigation = ({ title }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        height: isMobile ? "6rem" : "10rem",
        backgroundColor: theme.palette.background.default,
        display: "flex",
        alignItems: "center",
        paddingLeft: isMobile ? "0.8rem" : "1.2rem",
        fontSize: isMobile ? "2rem" : "3.2rem",
      }}
    >
      <Typography
        component={NavLink}
        to="/"
        sx={{
          fontSize: isMobile ? "2rem" : "3.2rem",
          textDecoration: "none",
          color: theme.palette.text.primary,
          marginRight: "0.5rem",
        }}
      >
        Home
      </Typography>
      /
      <Typography
        sx={{
          fontSize: isMobile ? "2rem" : "3.2rem",
          marginLeft: "0.5rem",
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default PageNavigation;
