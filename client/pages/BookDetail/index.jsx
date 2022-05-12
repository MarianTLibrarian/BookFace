import React, { useState, useEffect } from 'react';
import BookDetailModal from './BookDetailModal.jsx';
import axios from 'axios';
import moment from 'moment';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BookIcon from '@mui/icons-material/Book';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import ReviewsIcon from '@mui/icons-material/Reviews';

import { Rating } from '@mui/material';

import { signInWithGoogle } from '../../../components/Firebase';
import useStore from '../../userStore';

import './bookdetail.css';

const style = {
  'background': 'url(../assets/header-bg.jpg) no-repeat center center fixed'
}

export default function BookDetail() {
  const { user, setUser, setToken, bookDetails, expressUrl } = useStore();

  const [value, setBookshelf] = React.useState(null);
  const [status, setStatus] = React.useState(null);
  const [startReadDate, setStartReadDate] = useState(null);
  const [endReadDate, setEndReadDate] = useState(null);
  const [star, setStar] = useState(null);
  const [bookshelves, setBookshelves] = useState([]);

  const [isbn, setIsbn] = useState( bookDetails.isbn || 0 );
  const [title, setTitle] = useState (bookDetails.title || 'Great Book');
  const [authors, setAuthors] = useState (bookDetails.authors || ['Great Author']);
  const [publisher, setPublisher] = useState(bookDetails.publisher || "Great Publisher");
  const [publishedDate, setPublishedDate] = useState (bookDetails.publishedDate || "2000-01-01");
  const [description, setDescription] = useState(bookDetails.description || 'Great Description');
  const [categories, setCategories] = useState(bookDetails.categories || ['Uncategorized']);
  const [imageLinks, setImageLinks] = useState(bookDetails.imageLinks || {
    "smallThumbnail": "http://books.google.com/books/content?id=wmnuDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
    "thumbnail": "http://books.google.com/books/content?id=wmnuDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
  });
  const [language, setLanguage] = useState(bookDetails.language || 'en');

  // materialui--modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const [inBookShelf, setInBookshelf] = useState(false);
  const [edited, setEdited] = useState(false);

  /*------------------ HANDLER FUNCTION ---------------------- */

  // addtoshelf w/o login
  const handleuserLogin = () => signInWithGoogle()
  .then((result) => {
    if (!result || !result.user || !result.token) throw result;

    const { user: newUser, token } = result;

    localStorage.setItem('user_data', JSON.stringify(newUser));

    setUser(newUser);
    setToken(token);
  })
  .catch(console.error);

  // addtoshelf
  const handleAddtoShelf = () => {
    alert('added to shelf!')
    const staticbookdetail = {
      userId: user.uid,
      isbn: isbn,
      title: title,
      authors: authors,
      publisher: publisher,
      publishedDate: publishedDate,
      description: description,
      categories: categories,
      imageLinks: imageLinks,
      language: language,
    };
    axios
      .post(`${expressUrl}/books`,  staticbookdetail )
      .then(({ data }) => {
        console.log(data);
      })
      .then(()=>{
        setStatus('toread');
        setBookshelf({'title':'Dream Bookshelf'});
        setInBookshelf(true);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const UpdateBook = ()=>{
    const dynamicbookdetail = {
      userId: user.uid,
      isbn: isbn,
      rating: star,
      bookshelf: value.title,
      startReadDate:moment(startReadDate).format().slice(0, 10),
      endReadDate:moment(endReadDate).format().slice(0, 10),
      readingStatus: status
    };
    console.log(dynamicbookdetail);
    axios
      .put(`${expressUrl}/books/update`,  dynamicbookdetail )
      .then(({ data }) => {
        console.log(data);
        setEdited(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  /*------------------RENDER DYNAMIC---------------------- */

  const renderDynamicBtn = () => {
    if (!user) {
      return (<AddBoxIcon onClick={handleuserLogin}/>);
    }
    if (user && !inBookShelf) {
      return (<AddBoxIcon onClick={handleAddtoShelf} />)
    }
    if (user && inBookShelf) {
      return (<ModeEditOutlineIcon onClick={handleOpen} />)
    }
  }

  const renderModal = () => {
    if (user && status) {
      return <BookDetailModal bookshelves={bookshelves} value={value} setBookshelf={setBookshelf} status={status}
      setStatus={setStatus} startReadDate={startReadDate} setStartReadDate={setStartReadDate} endReadDate={endReadDate}
      setEndReadDate={setEndReadDate} star={star} setStar={setStar} open={open} setOpen={setOpen} UpdateBook={UpdateBook}/>
    }
    return null;
  }

  const renderDynamicStats = () => {
    if (user && edited) {
      return (
        <div className='bookdetailusrinputs'>
          {status?
            <div className='bookdetailreadingstatus'><CheckCircleIcon/>{status}</div>
          :null}
          {value?
            <div className='bookdetailbookshelf'><BookIcon/>{value.title || value}</div>
          : null}
          {startReadDate?
            <div className='bookdetailstartReaddate'><AccessTimeFilledIcon/>Start Reading Date: {moment(startReadDate).format().slice(0, 10)}</div>
          :null}
          {endReadDate?
            <div className='bookdetailendReaddate'><EmojiEmotionsIcon/>End Reading Date: {moment(endReadDate).format().slice(0, 10)}</div>
          :null}
          {star?
            <div className='bookdetailrating'><ReviewsIcon/>Rating: <Rating name="read-only" value={star} readOnly />
            </div>
          :null}
        </div>
      )}
    return null;
  }


  const getBookshelves = () => {
    axios
      .get(`${expressUrl}/bookshelves`, { params: { userId: user.uid } })
      .then(({ data }) => {
        console.log(data);
        setBookshelves(data.results);
      })
      .catch((err) => {
        console.error(err);
      });
    };

  useEffect(()=>{
    if (user) {
      getBookshelves();
    }
    if (bookDetails.readingStatus) {
      setStatus(bookDetails.readingStatus)
    } else {
      setStatus(null);
    }
    if (bookDetails.startReadDate) {
      setStartReadDate(moment(bookDetails.startReadDate)._d);
    }
    if (bookDetails.endReadDate) {
      setEndReadDate(moment(bookDetails.endReadDate)._d);
    }
    if (bookDetails.rating) {
      setStar(bookDetails.rating)
    }
    if (bookDetails.bookshelf) {
      setBookshelf(bookDetails.bookshelf);
    }
    if (bookDetails.isbn) {
      setIsbn(bookDetails.isbn)
    }
    if (bookDetails.title) {
      setTitle(bookDetails.title)
    }
    if (bookDetails.authors) {
      setAuthors(bookDetails.authors)
    }
    if (bookDetails.publisher) {
      setPublisher(bookDetails.publisher);
    }
    if (bookDetails.publishedDate) {
      setPublishedDate(bookDetails.publishedDate);
    }
    if (bookDetails.description) {
      setDescription(bookDetails.description);
    }
    if (bookDetails.categories) {
      setCategories(bookDetails.categories)
    }
    if (bookDetails.imageLinks) {
      setImageLinks(bookDetails.imageLinks)
    }
    if (bookDetails.language) {
      setLanguage(bookDetails.language)
    }
    if (bookDetails.status) {
      setInBookshelf(true);
    }
    if (bookDetails.startReadDate || bookDetails.endReadDate || bookDetails.rating) {
      setEdited(true);
    }
    // if (edited) {
    //   setInBookshelf(true);
    // }
    console.log('inbookshelf', inBookShelf);
    console.log('edited', edited);
  },[user, bookDetails, edited])

  return (
    <div className='header-container'>
      <div className='header' style={style}>
        <div className='filter' />
        <div className='main-content'>
          <h1>{title}</h1>
        </div>
      </div>
      <div className='bookdetailmain' >
      <div className='bookdetailleftcol'>
          <img className='bookdetailimg' alt='bookdetailimg' src={imageLinks.thumbnail}/>
          {renderDynamicStats()}
      </div>
      <div className='bookdetailrightcol'>
        <div className="bookdetailtitle">{title}</div>
        <div className='bookdetaildynamicbtn'>
          {renderDynamicBtn()}
        </div>
        <div className='bookdetailauthor'> by {authors[0]}</div>
        <div className='bookdetaildesc'>{description}</div>
        <div className='bookdetailgenre'>
          <p className='bookdetailmisctitle'>GENRES</p>
          <p>{categories}</p>
        </div>
        <div className='bookdetailpublishdetails'>
          <p className='bookdetailmisctitle'>PUBLISH INFO</p>
          Published {publishedDate} by {publisher}
        </div>
        <div className='bookdetailisbn'>
          <p className='bookdetailmisctitle'>ISBN</p>
          {isbn}
        </div>
      </div>
        {renderModal()}
      </div>
    </div>

  );
}

