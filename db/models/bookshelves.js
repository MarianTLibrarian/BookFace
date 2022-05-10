const db = require('../../db');
const { collection, getDocs, query, where, addDoc } = require('firebase/firestore');
module.exports = {

  allBookshelves(req, callback) {
    const { userId } = req.query;

    const q = query(collection(db, "bookshelves"), where("userId", "==", `${userId}`));
    getDocs(q)
      .then(snapshot => {
        const allBookshelves = [];
        snapshot.forEach((document) => {
          allBookshelves.push(document.data().bookshelf)
        })
        const result = {
          userId,
          results: allBookshelves
        }
        callback(null, result);
      })
      .catch(err => console.log('Error in get allBookshelves: ', err))
  },

  addBookshelf(req, callback) {
    addDoc(collection(db, "bookshelves"), req)
      .then(snapshot =>
        callback(null, snapshot)
      )
      .catch(err => console.log('Error in addBookshelf: ', err))
  }
}