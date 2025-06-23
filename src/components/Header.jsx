import { NavLink } from "react-router-dom";
import { AppBar, Toolbar, Box } from "@mui/material";
import NavBar from "./Nav";

function Header() {
  return (
    <AppBar 
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "#f5f5f5", // theme.colors.bg equivalent
        paddingX: "4.8rem",
        height: "10rem",
        justifyContent: "center",
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Box component={NavLink} to="/" sx={{ display: "block" }}>
          <Box
            component="img"
            src="/images/logo.avif"
            alt="logo image"
            sx={{
              height: "7.5rem",
              objectFit: "contain",
              display: "block",
            }}
          />
        </Box>

        <NavBar />
      </Toolbar>
    </AppBar>
  );
}

export default Header;
