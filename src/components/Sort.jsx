import { Box, Button, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';
import { useFilterContext } from './context/filter_context';

const Sort = () => {
  const { filter_products, grid_view, setGridView, setListView, sorting } = useFilterContext();

  return (
    <Box
      sx={{
        mt: 6,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 2,
      }}
    >
      {/* Grid/List Toggle */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          onClick={setGridView}
          variant={grid_view ? 'contained' : 'outlined'}
          color={grid_view ? 'primary' : 'inherit'}
          sx={{ minWidth: '40px', height: '40px', px: 1 }}
        >
          <ViewModuleIcon />
        </Button>

        <Button
          onClick={setListView}
          variant={!grid_view ? 'contained' : 'outlined'}
          color={!grid_view ? 'primary' : 'inherit'}
          sx={{ minWidth: '40px', height: '40px', px: 1 }}
        >
          <ViewListIcon />
        </Button>
      </Box>

      {/* Product Count */}
      <Typography variant="body1" sx={{ fontWeight: 500 }}>
        {filter_products.length} Product{filter_products.length !== 1 ? 's' : ''} Available
      </Typography>

      {/* Sorting Dropdown */}
      <FormControl size="small" sx={{ minWidth: 160 }}>
        <InputLabel id="sort-label">Sort By</InputLabel>
        <Select
          labelId="sort-label"
          id="sort"
          defaultValue="lowest"
          label="Sort By"
          onChange={sorting}
        >
          <MenuItem value="lowest">Price (Lowest)</MenuItem>
          <MenuItem value="highest">Price (Highest)</MenuItem>
          <MenuItem value="a-z">Name (A-Z)</MenuItem>
          <MenuItem value="z-a">Name (Z-A)</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default Sort;
