const axios = require('axios');
const { collection, getDocs, addDoc, query, where, updateDoc, doc } = require('firebase/firestore');
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

  personalBooks() {},

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

  addBook() { },

  // updateStatus(req, callback) {
  //   let {status, isbn, userId} = req.body;
  //   isbn = parseInt(isbn, 10);
  //   const q = query(collection(db, 'userBooksTest'), where("userId", "==", `${userId}`), where("isbn", "==", isbn));
  //   getDocs(q)
  //     .then(snapshot => {
  //       const id = [];
  //       snapshot.forEach((document) => {
  //         id.push(document.id)
  //       })
  //       return id[0]
  //     })
  //     .then(id => {
  //       const docRef = doc(db, 'userBooksTest', id);
  //       updateDoc(docRef,  {status: `${status}`} )
  //         .then(() => {
  //           callback(null, 'created');
  //         })
  //     })
  //     .catch(err => console.log('Error in update reading status: ', err))
  // },


  // addToBookshelf(req, callback) {
  //   let {bookshelf, isbn, userId} = req.body;
  //   isbn = parseInt(isbn, 10);
  //   const q = query(collection(db, 'userBooksTest'), where("userId", "==", `${userId}`), where("isbn", "==", isbn));
  //   getDocs(q)
  //     .then(snapshot => {
  //       const id = [];
  //       snapshot.forEach((document) => {
  //         id.push(document.id)
  //       })
  //       return id[0]
  //     })
  //     .then(id => {
  //       const docRef = doc(db, 'userBooksTest', id);
  //       updateDoc(docRef,  {bookshelf: `${bookshelf}`} )
  //         .then(() => {
  //           callback(null, 'created');
  //         })
  //     })
  //     .catch(err => console.log('Error in update bookshelf: ', err))
  // },

  // reviewBook() {},

  updateBook(req, callback) {
    let {rating, isbn, userId, bookshelf, startReadDate, endReadDate} = req.body;
    isbn = parseInt(isbn, 10);
    rating = parseInt(rating, 10);
    const q = query(collection(db, 'userBooksTest'), where("userId", "==", `${userId}`), where("isbn", "==", isbn));
    getDocs(q)
      .then(snapshot => {
        const id = [];
        snapshot.forEach((document) => {
          id.push(document.id)
        })
        return id[0]
      })
      .then(id => {
        const docRef = doc(db, 'userBooksTest', id);
        updateDoc(docRef,  {rating: rating, bookshelf: `${bookshelf}`, startReadDate: `${startReadDate}`, endReadDate: `${endReadDate}`} )
          .then(() => {
            callback(null, 'created');
          })
      })
      .catch(err => console.log('Error in update rating: ', err))
  },
};
