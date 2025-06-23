import { Box, TextField, Typography } from "@mui/material";
import { useFilterContext } from "./context/filter_context";


const Search = () => {
  const {filters: { text }, updateFiltersValue } = useFilterContext();

  return (
    <Box
      component="section"
      sx={{
        py: 6,
        display: "flex",
        flexDirection: "column",
        gap: 4,
        width: "100%",
      }}
    >
      {/* <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        Search Product
      </Typography> */}

      <Box component="form" onSubmit={(e) => e.preventDefault()}>
        <TextField
          fullWidth
          label="Search"
          name="text"
          value={text}
          onChange={updateFiltersValue}
          variant="outlined"
          size="small"
          sx={{
            maxWidth: { xs: "100%", sm: "400px" },
          }}
        />
      </Box>

      {/* You can add other filter elements (category, company, color, price etc.) here later */}
    </Box>
  );
};

export default Search;
