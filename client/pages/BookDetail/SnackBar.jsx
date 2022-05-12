import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function SnackBar({SnackBarOpen, setSnackBarOpen, handleSnackBarClick}) {

  const handleSnackBarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackBarOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleSnackBarClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar style={{color: 'white'}}
        open={SnackBarOpen}
        autoHideDuration={1500}
        onClose={handleSnackBarClose}
        message="ADDED TO BOOKSHELF"
        action={action}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      />
    </div>
  );
}
