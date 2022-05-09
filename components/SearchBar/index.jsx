import React, { useState } from 'react';
import Divider from '@mui/material/Divider';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import Popover from '@mui/material/Popover';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const filterOptions = {
  all: 'All',
  books: 'Books',
  myBooks: 'My Books',
  clubs: 'Clubs',
  myClubs: 'My Clubs',
};

export default function SearchBar() {
  const [searchFilter, setSearchFilter] = useState('all');
  const [anchorElem, setAnchorElem] = useState(null);

  const handleExpand = (event) => {
    setAnchorElem(event.currentTarget);
  };

  const handleFilterChange = (value) => {
    setSearchFilter(value);
    setAnchorElem(null);
  };

  const handleSearch = (event) => {
    event.preventDefault();

    const { value } = event.target;
    // console.log(value);
  };

  const open = !!anchorElem;

  return (
    <Paper
      component="form"
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 720,
      }}
    >
      <Button
        sx={{ p: '10px' }}
        aria-label="menu"
        color='inherit'
        onClick={handleExpand}
        endIcon={<ExpandMoreIcon />}
      >
        <Typography fontSize="small">{filterOptions[searchFilter]}</Typography>
      </Button>
      <Popover
        open={open}
        anchorEl={anchorElem}
        onClose={() => setAnchorElem(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        {Object.entries(filterOptions).map(([value, label]) => (
          <Typography
            key={value}
            sx={{ p: 1, cursor: 'pointer' }}
            onClick={() => handleFilterChange(value)}
          >
            {label}
          </Typography>
        ))}
      </Popover>
      <Divider orientation="vertical" variant="middle" flexItem />
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        inputProps={{ 'aria-label': 'search bookface' }}
        placeholder="Search for something"
        endAdornment={
          <IconButton type="submit" sx={{ p: '10px' }} aria-label="search" onSubmit={handleSearch}>
            <SearchIcon />
          </IconButton>
        }
        onSubmit={handleSearch}
      />
    </Paper>
  );
}
