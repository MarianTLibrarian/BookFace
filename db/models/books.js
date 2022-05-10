const axios = require('axios');
const db = require('..');
const { nytConfig } = require('../config');
const { collection, getDocs, addDoc, query } = require('firebase/firestore');

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

  addBook() {},

  updateStatus() {},

  addToBookshelf() {},

  reviewBook() {},

  rateBook() {},
};
