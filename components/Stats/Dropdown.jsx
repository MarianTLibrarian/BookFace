import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Dropdown({ menus, menusView, handleMenuView, handleViewChange }) {

  const handleChange = (event) => {
    handleMenuView(event.target.value);
    handleViewChange(event.target.value);
  };

  return (
    <div>
      <FormControl
        fullWidth
        sx={{ border: '2px solid black'}}
      >
        <Select
          id="select"
          value={menusView}
          onChange={handleChange}
          sx={{ 'fn': '2px solid black'}}
        >
          {menus.map((menu) => (
            <MenuItem
              key={menu}
              value={menu}
            >
              {menu}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}