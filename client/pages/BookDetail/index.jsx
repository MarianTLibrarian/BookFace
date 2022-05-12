import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
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

export default function BookDetail() {
  const { user, setUser, setToken, bookDetails, setBookDetails, expressUrl } = useStore();

  const [bookshelves, setBookshelves] = useState([]);
  // materialui--modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = ()=>{
    const updatedbook = {
      userId: JSON.parse(user).uid,
      isbn: bookDetails.isbn,
      rating: star,
      bookshelf: value.title,
      startReadDate:moment(startReadDate).format().slice(0, 10),
      endReadDate:moment(endReadDate).format().slice(0, 10),
      readingStatus: status
    };
    axios
      .put(`${expressUrl}/books/update`,  updatedbook )
      .then(({ data }) => {
        // console.log(data);
        setBookDetails({
          isbn: bookDetails.isbn,
          rating: star,
          bookshelf: value.title,
          startReadDate:moment(startReadDate).format().slice(0, 10),
          endReadDate:moment(endReadDate).format().slice(0, 10),
          readingStatus: status,
          title: bookDetails.title,
          authors: bookDetails.authors,
          publisher: bookDetails.publisher,
          publishedDate: bookDetails.publishedDate,
          description: bookDetails.description,
          categories: bookDetails.categories,
          imageLinks: bookDetails.imageLinks,
          language: bookDetails.language
        });
      })
      .catch((err) => {
        console.error(err);
      });


    handleClose();
  }
  // materialui-bookshelffilter
  const filter = createFilterOptions();
  const [value, setBookshelf] = React.useState({"title":bookDetails.bookshelf}|| null);
  // materialui-statusdropdown
  // bookDetails.readingStatus|| 'toread'
  const [status, setStatus] = React.useState(null );
  const handleChange = (event) => {
    setStatus(event.target.value);
  };
  // datepicker
  const [startReadDate, setStartReadDate] = useState(new Date());
  const [endReadDate, setEndReadDate] = useState(new Date());
  // rating
  const [star, setStar] = useState(bookDetails.rating || 0);
  // addtoshelf
  const handleAddtoShelf = () => {
    alert('added to shelf!')
    const updatedbookdetail = {
      userId: JSON.parse(user).uid,
      isbn: bookDetails.isbn,
      title: bookDetails.title,
      authors: bookDetails.authors,
      publisher: bookDetails.publisher,
      publishedDate: bookDetails.publishedDate,
      description: bookDetails.description,
      categories: bookDetails.categories,
      imageLinks: bookDetails.imageLinks,
      language: bookDetails.language,
    };
    axios
      .post(`${expressUrl}/books`,  updatedbookdetail )
      .then(({ data }) => {
        // console.log(data);
      })
      .then(()=>{setStatus('toread')})
      .catch((err) => {
        console.error(err);
      });
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
    if (user && !status) {
      return (<AddBoxIcon onClick={handleAddtoShelf} />)
    }
    if (user && status) {
      return (<ModeEditOutlineIcon onClick={handleOpen} />)
    }
  }

  const getBookshelves = (uid) => {
    axios
      .get(`${expressUrl}/bookshelves`, { params: { userId: "1" } })
      .then(({ data }) => {
        // console.log(data);
        setBookshelves(data.results);
      })
      .catch((err) => {
        console.error(err);
      });
    };

  useEffect(()=>{
    getBookshelves();
    if (bookDetails.startReadDate) {
      setStartReadDate(moment(bookDetails.startReadDate)._d);
    }
    if (bookDetails.endReadDate) {
      setEndReadDate(moment(bookDetails.endReadDate)._d);
    }
  },[status])



  return (
    <div className='header-container'>
      <div className='header' style={style}>
        <div className='filter' />
        <div className='main-content'>
          <h1>{bookDetails.title}</h1>
        </div>
      </div>
      <div className='bookdetailmain' >
      <div className='bookdetailleftcol'>
          <img className='bookdetailimg' alt='bookdetailimg' src={bookDetails.imageLinks.thumbnail}/>
          {user?
            <div className='bookdetailusrinputs'>
              {bookDetails.readingStatus? <div className='bookdetailreadingstatus'>
              <CheckCircleIcon/>
              {bookDetails.readingStatus}</div> :null}
              {bookDetails.bookshelf?<div className='bookdetailbookshelf'>
              <BookIcon/>{bookDetails.bookshelf}</div> : null}
              {bookDetails['startReadDate']?<div className='bookdetailstartReaddate'><AccessTimeFilledIcon/>Start Reading Date: {bookDetails['startReadDate']}</div> :null}
              {bookDetails['endReadDate']?<div className='bookdetailendReaddate'><EmojiEmotionsIcon/>End Reading Date: {bookDetails['endReadDate']}</div> :null}
              {bookDetails.rating? <div className='bookdetailrating'><ReviewsIcon/>Rating:
              <Rating name="read-only" value={bookDetails.rating} readOnly />
              </div>:null}
            </div>
            : null}
      </div>
      <div className='bookdetailrightcol'>
        <div className="bookdetailtitle">{bookDetails.title}</div>
        <div className='bookdetaildynamicbtn'>
          {renderElement()}
        </div>
        <div className='bookdetailauthor'> by {bookDetails.authors[0]}</div>
        <div className='bookdetaildesc'>{bookDetails.description}</div>
        <div className='bookdetailgenre'>
          <p className='bookdetailmisctitle'>GENRES</p>
          <p>{bookDetails.categories}</p>
        </div>
        <div className='bookdetailpublishdetails'>
          <p className='bookdetailmisctitle'>PUBLISH INFO</p>
          Published {bookDetails.publishedDate} by {bookDetails.publisher}
        </div>
        <div className='bookdetailisbn'>
          <p className='bookdetailmisctitle'>ISBN</p>
          {bookDetails.isbn}
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
              options={bookshelves}
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

