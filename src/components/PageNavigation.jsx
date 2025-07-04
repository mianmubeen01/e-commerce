import { NavLink } from "react-router-dom";
import { Box, Breadcrumbs, Typography, Link, useTheme, useMediaQuery } from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const PageNavigation = ({ title }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.default,
        py: isMobile ? 2 : 4,
        px: isMobile ? 2 : 6,
      }}
    >
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{
          fontSize: isMobile ? "1.2rem" : "1.4rem",
          fontWeight: 500,
        }}
      >
        <Link
          component={NavLink}
          to="/"
          underline="hover"
          sx={{
            color: theme.palette.primary.main,
            fontWeight: 600,
            '&:hover': {
              color: theme.palette.primary.dark,
            },
          }}
        >
          Home
        </Link>

        <Typography
          color="text.primary"
          sx={{
            textTransform: 'capitalize',
            fontWeight: 600,
          }}
        >
          {title}
        </Typography>
      </Breadcrumbs>
    </Box>
  );
};

export default PageNavigation;
