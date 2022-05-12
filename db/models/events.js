const db = require('../../db');
const { collection, getDocs, query, where, addDoc } = require('firebase/firestore');
module.exports = {

  allEvents(req, callback) {
    const { bookclubName } = req.query;

    const q = query(collection(db, "events"), where("bookclubName", "==", `${bookclubName}`));
    getDocs(q)
      .then(snapshot => {
        const allEvents = [];
        snapshot.forEach((document) => {
          allEvents.push({...document.data()})
        })
        callback(null, allEvents);
      })
      .catch(err => console.log('Error in get allBookshelves: ', err))
  },

  addEvent(req, callback) {
    addDoc(collection(db, "events"), req)
      .then(snapshot =>
        callback(null, snapshot)
      )
      .catch(err => console.log('Error in addBookshelf: ', err))
  }
}