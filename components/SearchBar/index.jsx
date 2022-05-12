import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import Popover from '@mui/material/Popover';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import useStore from '../../client/userStore';

const defaultFilterOptions = {
  all: 'All',
  books: 'Books',
  myBooks: 'My Books',
  clubs: 'Clubs',
  myClubs: 'My Clubs',
};

export default function SearchBar({ filterOptions = defaultFilterOptions }) {
  const [dropdownOption, setDropdownOption] = useState(() => Object.keys(filterOptions)[0]);
  const [anchorElem, setAnchorElem] = useState(null);
  const navigateTo = useNavigate();

  const searchQuery = useStore((state) => state.searchQuery);
  const setSearchQuery = useStore((state) => state.setSearchQuery);
  const setSearchFilter = useStore((state) => state.setSearchFilter);

  const handleExpand = (event) => {
    setAnchorElem(event.currentTarget);
  };

  const handleFilterChange = (value) => {
    setDropdownOption(value);
    setSearchFilter(value);
    setAnchorElem(null);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    navigateTo('/search');
  };

  const open = !!anchorElem;

  return (
    <Paper
      component="div"
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Button
        sx={{ p: '10px' }}
        aria-label="menu"
        color="inherit"
        onClick={handleExpand}
        endIcon={<ExpandMoreIcon />}
      >
        <Typography fontSize="small">{filterOptions[dropdownOption]}</Typography>
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
        placeholder={searchQuery || 'Search for something'}
        endAdornment={
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSubmit}>
            <SearchIcon />
          </IconButton>
        }
        onChange={handleSearch}
        onSubmit={handleSubmit}
      />
    </Paper>
  );
}
