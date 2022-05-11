import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BookIcon from '@mui/icons-material/Book';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import ReviewsIcon from '@mui/icons-material/Reviews';

import { Modal, Box, Button, TextField, InputLabel, MenuItem, FormControl, Select, Rating } from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

// import DatePicker from 'react-date-picker';
// import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-date-picker/dist/entry.nostyle';
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

import { signInWithGoogle } from '../../../components/Firebase';
import useStore from '../../userStore';

import './bookdetail.css';

const style = {
  'background': 'url(../assets/header-bg.jpg) no-repeat center center fixed'
}

export default function BookDetail({fakebookdetail}) {
  const { user, setUser, setToken } = useStore();
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
  // materialui--modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = ()=>{
    // complete this submit function
    alert('complete submit function')
    handleClose();
  }
  // materialui-bookshelffilter
  const filter = createFilterOptions();
  const [value, setBookshelf] = React.useState(null);
  // materialui-statusdropdown
  const [status, setStatus] = React.useState('toread');
  const handleChange = (event) => {
    setStatus(event.target.value);
  };
  // datepicker
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  // rating
  const [star, setStar] = useState(0);
  // addtoshelf
  const handleAddtoShelf = () => {
    alert('added to shelf!')
  }
  // addtoshelf w/o login
  const handleuserLogin = () => signInWithGoogle()
      .then((result) => {
        if (!result || !result.user || !result.token) throw result;

        const { user: newUser, token } = result;

        localStorage.setItem('user_data', JSON.stringify(newUser));

        setUser(newUser);
        setToken(token);
      })
      .catch(console.error)

  const renderElement = () => {
    if (!user) {
      return (<AddBoxIcon onClick={handleuserLogin}/>);
    }
    if (!fakeData.readingStatus) {
      return (<AddBoxIcon onClick={handleAddtoShelf} />)
    }
      return (<ModeEditOutlineIcon onClick={handleOpen} />)
  }

  useEffect(()=>{
    axios.get('http://localhost:3030/books', {params: {
      userId: 1
    }})
    .then((data)=>{console.log(data)})
    .catch(err=>{console.log(err)})
  },[])

  return (
    <div className='header-container'>
      <div className='header' style={style}>
        <div className='filter' />
        <div className='main-content'>
          <h1>{fakeData.title}</h1>
        </div>
      </div>
      <div className='bookdetailmain' >
      <div className='bookdetailleftcol'>
          <img className='bookdetailimg' alt='bookdetailimg' src={fakeData.imageLinks.thumbnail}/>
          {user?
            <div className='bookdetailusrinputs'>
              {fakeData.readingStatus? <div className='bookdetailreadingstatus'>
              <CheckCircleIcon/>
              {fakeData.readingStatus}</div> :null}
              {fakeData.bookshelf?<div className='bookdetailbookshelf'>
              <BookIcon/>{fakeData.bookshelf}</div> : null}
              {fakeData['start-read-date']?<div className='bookdetailstartdate'><AccessTimeFilledIcon/>Start Reading Date: {fakeData['start-read-date']}</div> :null}
              {fakeData['finish-read-date']?<div className='bookdetailenddate'><EmojiEmotionsIcon/>End Reading Date: {fakeData['finish-read-date']}</div> :null}
              {fakeData.rating? <div className='bookdetailrating'><ReviewsIcon/>Rating:
              <Rating name="read-only" value={fakeData.rating} readOnly />
              </div>:null}
            </div>
            : null}
      </div>
      <div className='bookdetailrightcol'>
        <div className="bookdetailtitle">{fakeData.title}</div>
        <div className='bookdetaildynamicbtn'>
          {renderElement()}
        </div>
        <div className='bookdetailauthor'> by {fakeData.authors[0]}</div>
        <div className='bookdetaildesc'>{fakeData.description}</div>
        <div className='bookdetailgenre'>
          <p className='bookdetailmisctitle'>GENRES</p>
          <p>{fakeData.categories}</p>
        </div>
        <div className='bookdetailpublishdetails'>
          <p className='bookdetailmisctitle'>PUBLISH INFO</p>
          Published {fakeData.publishedDate} by {fakeData.publisher}
        </div>
        <div className='bookdetailisbn'>
          <p className='bookdetailmisctitle'>ISBN</p>
          {fakeData.isbn13}
        </div>
      </div>
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
                <TextField {...params} id="outlined-basic" variant="filled" sx={{border: '2px solid black', bgcolor: 'white'}} label="Add to your bookshelf"/>
              )}
            />
          </div>
          <div className='modalreadingstats' >
            <FormControl fullWidth sx={{border: '2px solid black'}} >
              {/* <InputLabel id="demo-simple-select-label">Reading Status</InputLabel> */}
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
            <DatePicker value={startDate} onChange={(date) => setStartDate(date)} />
          </div>
          <div className='modaldateend'>
            DATE FINISHED
            <DatePicker value={endDate} onChange={(date) => setEndDate(date)} />
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
          <div className='modalcancelbtn'>
            <Button variant="contained" onClick={handleClose}>Cancel</Button>
          </div>
          <div className='modalsubmitbtn'>
            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
          </div>
        </Box>
      </Modal>
      </div>
    </div>





  );
}

