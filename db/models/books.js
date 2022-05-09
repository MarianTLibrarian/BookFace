const db = require('../../db');
const axios = require('axios');
const { nytConfig } = require('../../db/exampleConfig');
const {collection, getDocs, addDoc, query} = require('firebase/firestore');


module.exports = {

  searchBooks() { },

  personalBooks() { },

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
      .then(res => {
        callback(null, res.data.results.lists);
      })
      .catch((err) => {
        console.log('Error in getting popularBooks:', err);
      });
  },

  addBook() { },

  updateStatus() { },

  addToBookshelf() { },

  reviewBook() { },

  rateBook() { },

};
