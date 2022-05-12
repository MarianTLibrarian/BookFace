const axios = require('axios');
const { collection, getDocs, addDoc, query, where, updateDoc, doc, limit } = require('firebase/firestore');
const db = require('..');
const { nytConfig } = require('../config');


const googleBooksAPIUrl = 'https://www.googleapis.com/books/v1/volumes';

module.exports = {
  async searchBooks(q) {
    const url = `${googleBooksAPIUrl}?q=${q}`;

    return (await axios.get(url)).data.items;
  },

  async bookDetails(volumeId) {
    const url = `${googleBooksAPIUrl}/${volumeId}`;

    return (await axios.get(url)).data;
  },

  personalBooks(req, callback) {
    const {userId, count = 10} = req.query;
    const q = query(collection(db, 'PersonalBookLibrary'), where("userId", "==", `${userId}`), limit(count));
    getDocs(q)
      .then(snapshot => {
        const myBooks = [];
        snapshot.forEach((document) => {
          myBooks.push({...document.data()});
        })
        callback(null, {userId: `${userId}`, results: myBooks});
      })
      .catch(err => console.log('Error in getting all personal books: ', err))

  },

  popularBooks(req, callback) {
    const key = nytConfig.apiKey;
    const option = {
      method: 'get',
      url: `https://api.nytimes.com/svc/books/v3/lists/overview.json?published_date=2022-05-15&api-key=${key}`,
      headers: {
        'User-Agent': 'request',
      },
    };
    return axios(option)
      .then((res) => {
        callback(null, res.data.results.lists);
      })
      .catch((err) => {
        console.log('Error in getting popularBooks:', err);
      });
  },

  addBook(req, callback) {
    let {isbn, userId, title, authors, publisher, publishedDate, description, pageCount, categories, imageLinks, language} = req.body;
    isbn = parseInt(isbn, 10);
    pageCount = parseInt(pageCount, 10);
    addDoc(collection(db, 'PersonalBookLibrary'), {
      userId,
      isbn,
      title,
      authors,
      publisher,
      publishedDate,
      description,
      pageCount,
      categories,
      imageLinks,
      language,
      readingStatus: "toread",
      rating: 0,
      bookshelf: "Dream Bookshelf",
      review: "",
      review_date: "",
      startReadDate: "",
      endReadDate: ""
    })
    .then(()=>{
      const getbookshelfq = query(collection(db, 'bookshelves'), where("userId", "==", `${userId}`), where("bookshelf", "==", 'Dream Bookshelf'));
      getDocs(getbookshelfq)
      .then(snapshot => {
        const arr = [];
        snapshot.forEach((document) => {
          arr.push({...document.data()});
        })
        if (arr.length === 0) {
          addDoc(collection(db, 'bookshelves'), {
            userId,
            bookshelf: 'Dream Bookshelf'
          })
        }
      })
    })
    .then(()=>{
      callback(null, 'created')
    })
    .catch(err => console.log('Error in add a book: ', err))
   },

  updateBook(req, callback) {
    let {rating, isbn, userId, bookshelf, startReadDate, endReadDate, readingStatus} = req.body;
    isbn = parseInt(isbn, 10);
    rating = parseInt(rating, 10);
    const q = query(collection(db, 'PersonalBookLibrary'), where("userId", "==", `${userId}`), where("isbn", "==", isbn));
    const getbookshelfq = query(collection(db, 'bookshelves'), where("userId", "==", `${userId}`), where("bookshelf", "==", `${bookshelf}`));
    getDocs(getbookshelfq)
    .then(snapshot => {
      const arr = [];
      snapshot.forEach((document) => {
        arr.push({...document.data()});
      })
      if (arr.length === 0) {
        addDoc(collection(db, 'bookshelves'), {
          userId,
          bookshelf
        })
      }
    })
    .then(()=>{
      getDocs(q)
      .then(snapshot => {
        const id = [];
        snapshot.forEach((document) => {
          id.push(document.id);
        })
        return id[0];
      })
      .then(id => {
        const docRef = doc(db, 'PersonalBookLibrary', id);
        updateDoc(docRef,  {rating, bookshelf, startReadDate, endReadDate, readingStatus})
          .then(() => {
            callback(null, 'created');
          })
      })
    })
    .catch(err => console.log('Error in update rating: ', err))
  },
};
