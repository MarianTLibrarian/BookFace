import React, { useState, useEffect } from 'react';
import { Modal, Box, Button, TextField, InputLabel, MenuItem, FormControl, Select, Rating } from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

import DatePicker from 'react-date-picker/dist/entry.nostyle';
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

import './bookdetail.css';


export default function BookDetailModal({bookshelves,value,setBookshelf,status,setStatus, startReadDate, setStartReadDate, endReadDate, setEndReadDate, star, setStar, open, setOpen, UpdateBook, handleSnackBarClick}) {

  const filter = createFilterOptions();

  const handleChange = (event) => {
    setStatus(event.target.value);
    console.log(status);
  };

  const handleClose = () => setOpen(false);

  const handleSubmit = ()=>{
    if (!value || !startReadDate || !endReadDate) {
      $(".hiddenbox2").click();
    } else {
      $(".hiddenbox1").click();
      UpdateBook();
      handleClose();
    }
  }


  return(
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className='modalBox'>
        <div className='modalbookshelf'>
          <Autocomplete
            value={value}
            onChange={(event, newValue) => {
              if (typeof newValue === 'string') {
                setBookshelf({
                  title: newValue,
                });
              } else if (newValue && newValue.inputValue) {
                setBookshelf({
                  title: newValue.inputValue,
                });
              } else {
                setBookshelf(newValue);
              }
            }}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);
              const { inputValue } = params;
              const isExisting = options.some((option) => inputValue === option);
              if (inputValue !== '' && !isExisting) {
                filtered.push({
                  inputValue,
                  title: `Add "${inputValue}"`,
                });
              }
              return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            id="free-solo-with-text-demo"
            options={bookshelves}
            getOptionLabel={(option) => {
              if (typeof option === 'string') {
                return option;
              }
              if (option.inputValue) {
                return option.inputValue;
              }
              return option.title;
            }}
            renderOption={(props, option) => <li {...props}>{option.title}</li>}
            sx={{ width: 300 }}
            freeSolo
            renderInput={(params) => (
              <TextField {...params} id="outlined-basic" variant="filled" sx={{ border: '2px solid black', bgcolor: 'white' }} label="Add to your bookshelf" />
            )}
          />
        </div>
        <div className='modalreadingstats' >
          <FormControl fullWidth sx={{ border: '2px solid black' }} >
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              label="Reading Status"
              onChange={handleChange}
            >
              <MenuItem value="toread">To Read</MenuItem>
              <MenuItem value="reading">Reading</MenuItem>
              <MenuItem value="read">Read</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className='modaldatestarted'>
          DATE STARTED
          <DatePicker value={startReadDate} onChange={(date) => setStartReadDate(date)} />
        </div>
        <div className='modaldateend'>
          DATE FINISHED
          <DatePicker value={endReadDate} onChange={(date) => setEndReadDate(date)} />
        </div>
        <div className='modalrating'>
          RATE THIS BOOK
          <Rating
            name="simple-controlled"
            value={star}
            onChange={(event, newValue) => {
              setStar(newValue);
            }}
          />
        </div>
        <div style={{color:'white'}} onClick={handleSnackBarClick('Book Stats Updated')} className='hiddenbox1'>test1</div>
        <div style={{color:'white'}} onClick={handleSnackBarClick('Please fill out the form')} className='hiddenbox2'>test2</div>
        <div className='modalcancelbtn'>
          <Button variant="contained" onClick={handleClose}>Cancel</Button>
        </div>
        <div className='modalsubmitbtn'>
          <Button variant="contained" onClick={handleSubmit} >Submit</Button>
        </div>
      </Box>
    </Modal>
  )

}

// onMouseDown={handleSubmit}