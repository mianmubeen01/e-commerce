import { NavLink } from "react-router-dom";
import { AppBar, Toolbar, Box } from "@mui/material";
import NavBar from "./Nav";

function Header() {
  return (
    <AppBar 
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "white",
        paddingX: "4.8rem",
        height: "5rem",
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
            src="/images/logo.png"
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
      <hr/>
    </AppBar>
  );
}

export default Header;
