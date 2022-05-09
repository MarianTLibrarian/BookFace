import React, { useState, useEffect } from 'react';
import { Modal, Box, Button, TextField } from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

import AddBoxIcon from '@mui/icons-material/AddBox';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BookDetail({fakebookdetail}) {
  const [userLogged, setuserLogged] = useState(false);
  const [fakeData, setFakeData] = useState({
    "isbn13": 9781950968428,
    "title": "About Time: A History of Civilization in Twelve Clocks",
    "authors": [ "David Rooney"],
    "publisher": "W. W. Norton & Company",
    "publishedDate": "2021-08-17",
    "description": "A captivating, surprising history of timekeeping and how it has shaped our world. For thousands of years, people of all cultures have made and used clocks, from the city sundials of ancient Rome to the medieval water clocks of imperial China, hourglasses fomenting revolution in the...",
    "pageCount": 288,
    "categories": ["History"],
    "imageLinks": {
                  "smallThumbnail": "http://books.google.com/books/content?id=rgIDEAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
                  "thumbnail": "http://books.google.com/books/content?id=rgIDEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    "language": "en",
    "readingStatus": "reading",
    "rating" : 5,
    "bookshelf": "Haley's Bookshelf",
    "review" : "not so good",
    "review_date": "2021-08-25",
    "start-read-date": "2021-12-18",
    "finish-read-date": "2022-05-19"
  });
  const [fakebookshelves, setFakebookshelves] = useState([
    { title: 'readingwithHaley' },
    { title:'readingwithHailee' },
    { title:'readingwithJP' },
    { title:'HappyReading' },]);
  //materialui--modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //materialui-bookshelffilter
  const filter = createFilterOptions();
  const [value, setBookshelf] = React.useState(null);
  //materialui-statusdropdown
  const [status, setStatus] = React.useState('');
  const handleChange = (event) => {
    setStatus(event.target.value);
  };


  return (
    <div className='bookdetailmain' style={{position: 'absolute', top: '120px'}}>
      <div className='bookdetailrightcol'>
        <div className="bookdetailtitle">{fakeData.title}</div>
        <div className='bookdetaildynamicbtn'>
          {userLogged? <AddBoxIcon onClick={()=>{alert('hi')}}/> : <ModeEditOutlineIcon/>}
        </div>
        <div className='bookdetailauthor'> by {fakeData.authors[0]}</div>
        <div className='bookdetaildesc'>{fakeData.description}</div>
        <div className='bookdetailgenre'>
          Genres
          <p>{fakeData.categories}</p>
        </div>
        <div className='bookdetailpublishdetails'>
          Published {fakeData.publishedDate} by {fakeData.publisher}
        </div>
        <div className='bookdetailisbn'>{fakeData.isbn13}</div>
      </div>
      <div className='bookdetailleftcol'>
        <img className='bookdetailimg' src={fakeData.imageLinks.thumbnail}></img>
        {userLogged?
          <div className='bookdetailusrinputs'>
            <div className='bookdetailreadingstatus'>{fakeData.readingStatus}</div>
            <div className='bookdetailbookshelf'>{fakeData.bookshelf}</div>
            <div className='bookdetailstartdate'>Start Reading Date: {fakeData['start-read-date']}</div>
            <div className='bookdetailenddate'>End Reading Date: {fakeData['finish-read-date']}</div>
            <div className='bookdetailrating'>Rating: {fakeData.rating}</div>
          </div>
          : null}
      </div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box style={{backgroundColor: 'orange',color: 'red', position:'absolute', top: '150px', left: '150px', width: '500px', height: '500px', padding:'40px'}}>
          <div className='modalbookshelf' style={{ color: 'black', backgroundColor:'green'}}>
            <Autocomplete
              value={value}
              onChange={(event, newValue) => {
                if (typeof newValue === 'string') {
                  setBookshelf({
                    title: newValue,
                  });
                } else if (newValue && newValue.inputValue) {
                  // Create a new value from the user input
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
                // Suggest the creation of a new value
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
              options={fakebookshelves}
              getOptionLabel={(option) => {
                // Value selected with enter, right from the input
                if (typeof option === 'string') {
                  return option;
                }
                // Add "xxx" option created dynamically
                if (option.inputValue) {
                  return option.inputValue;
                }
                // Regular option
                return option.title;
              }}
              renderOption={(props, option) => <li {...props}>{option.title}</li>}
              sx={{ width: 300 }}
              freeSolo
              renderInput={(params) => (
                <TextField {...params} label="Add to your bookshelf" />
              )}
            />
          </div>
          <div className='modalreadingstats' style={{backgroundColor:'red'}}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Reading Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label="Reading Status"
                onChange={handleChange}
              >
                <MenuItem value={'toread'}>To Read</MenuItem>
                <MenuItem value={'reading'}>Reading</MenuItem>
                <MenuItem value={'read'}>Read</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className='datestarted'>


          </div>






        </Box>
      </Modal>

    </div>
  );
}

