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

  updateStatus(req, callback) {
    console.log(req.body);
    const {status, isbn, userId} = req.body;
    const q = query(collection(db, "userBooksTest"), where("userId", "==", `${userId}`), where("isbn", "==", isbn.toNumber()));

    // const docRef = getDocs(q);
    // updateDoc(docRef, {status: 'reading'})
    // .then(()=>{console.log('updated')})
    // .catch(err=> console.log(err));
    getDocs(q)
    .then(snapshot=>new Promise((resolve, reject)=>{
        const mybooks = [];
        snapshot.forEach(doc=>{
          mybooks.push({id:doc.id})
        });
        resolve(mybooks);
      }))
    .then((mybooks)=>{
      console.log(mybooks[0].id);
      const docRef = doc(db, 'userBooksTest', mybooks[0].id);

      updateDoc(docRef, {status: 'reading'})
      .then(()=>{
        console.log('success');
        callback(null, 'created');
      })
      .catch(()=>{console.log('modalerror')});
    })
    .catch(err=>console.log(err));
    // console.log(mybooks, '1')

    // const docRef = collection(db, 'userBooksTest', mybooks[0].id)
    // updateDoc(docRef, {status: 'reading'})
    // .then(()=>{console.log('success')})
    // .catch(()=>{console.log('modalerror')});

    // const q = query(collection(db, "userBooks"), where("userId", "==", `${userId}`));

    // getDocs(q)
    //   .then(snapshot=>{
    //     const mybooks = [];
    //     snapshot.forEach(doc=>{
    //       mybooks.push({...doc.data(), id: doc.id})
    //     })
    //     callback(null, mybooks)
    //   })
    //   .catch(err=>console.log(err));

  },


  addToBookshelf() {},

  reviewBook() {},

  rateBook() {},
};
