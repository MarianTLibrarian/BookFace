
const { collection, getDocs, query, where, addDoc, arrayUnion, arrayRemove, serverTimestamp, updateDoc, doc } = require('firebase/firestore');
const db = require('../../db');

module.exports = {

  allClubs(req, callback) {
    getDocs(collection(db, "bookclubs"))
      .then(snapshot => {
        const bookclubs = [];
        snapshot.docs.forEach((document) => {
          bookclubs.push({ ...document.data(), id: document.id })
        })
        getDocs(collection(db, "posts"))
          .then(post => {
            const posts = [];
            post.docs.forEach((document) => {
              posts.push({ ...document.data(), id: document.id })
            })
            bookclubs.forEach(bookclub => {
              const postArray = [];
              posts.forEach(item => {
                if (item.bookclubName === bookclub.bookclubInfo.bookclubName) {
                  postArray.push(item)
                }
              })
              bookclub.posts = postArray;
            })
            callback(null, bookclubs);
          })
      })
      .catch(err => console.log('Error in get allClubs: ', err))
  },

  myClubs(req, callback) {

    const { userId } = req.query;
    const q = query(collection(db, "bookclubs"), where("users", "array-contains", `${userId}`));
    getDocs(q)
      .then(snapshot => {
        const myBookclubs = [];
        snapshot.forEach((document) => {
          myBookclubs.push({ ...document.data(), id: document.id })
        })
        getDocs(collection(db, "posts"))
          .then(post => {
            const posts = [];
            post.docs.forEach((document) => {
              posts.push({ ...document.data(), id: document.id })
            })
            myBookclubs.forEach(bookclub => {
              const postArray = [];
              posts.forEach(post => {
                if (post.bookclubName === bookclub.bookclubInfo.bookclubName) {
                  postArray.push(post)
                }
              })
              bookclub.posts = postArray;
            })
            const result = {
              userId,
              results: myBookclubs
            }
            callback(null, result);
          })
      })
      .catch(err => console.log('Error in get myClubs: ', err))
  },

  createClub(req, callback) {
    addDoc(collection(db, "bookclubs"), req)
      .then(snapshot =>
        callback(null, snapshot)
      )
      .catch(err => console.log('Error in get createClub: ', err))
  },

  postMessage(req, callback) {
    // console.log(req)
    const { userId, bookclubName, postBody, posterUserImg } = req;
    const data = { userId, bookclubName, postBody, posterUserImg, postDate: serverTimestamp() }
    addDoc(collection(db, "posts"), data)
      .then(snapshot =>
        callback(null, snapshot)
      )
      .catch(err => console.log('Error in get postMessage: ', err))
  },

  joinClub(req, callback) {
    const { userId, bookclubName } = req;
    const q = query(collection(db, "bookclubs"), where("bookclubInfo.bookclubName", "==", `${bookclubName}`));
    getDocs(q)
      .then(snapshot => {
        const id = [];
        snapshot.forEach((document) => {
          id.push(document.id)
        })
        return id[0]
      })
      .then(id => {
        const docRef = doc(db, "bookclubs", id);
        updateDoc(docRef, { users: arrayUnion(userId) })
          .then(() => {
            callback(null, "created");
          })
      })
      .catch(err => console.log('Error in get joinClub: ', err))
  },

  deleteClub(req, callback) {
    const { userId, bookclubName } = req;
    const q = query(collection(db, "bookclubs"), where("bookclubInfo.bookclubName", "==", `${bookclubName}`));
    getDocs(q)
      .then(snapshot => {
        const id = [];
        snapshot.forEach((document) => {
          id.push(document.id)
        })
        return id[0]
      })
      .then(id => {
        const docRef = doc(db, "bookclubs", id);
        updateDoc(docRef, { users: arrayRemove(userId) })
          .then(() => {
            callback(null, "removed");
          })
      })
      .catch(err => console.log('Error in get deleteClub: ', err))
  },

};