const db = require('../../db');
const axios = require('axios');
const {collection, getDocs, addDoc} = require('firebase/firestore');

module.exports = {
  allClubs(req, callback) {
    const bookclubsRef = collection(db, "bookclubs");
    getDocs(bookclubsRef)
      .then(snapshot => {
        const bookclubs = [];
        snapshot.docs.forEach((doc) => {
          bookclubs.push({ ...doc.data(), id: doc.id })
        })
        callback(null, bookclubs);
      })
      .catch(err => console.log('Error in get allClubs: ', err))
  },

  myClubs() { },

  createClub() { },

  postMessage() { },

  joinClub() { },

  deleteClub() { },



};