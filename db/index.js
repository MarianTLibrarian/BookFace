const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, addDoc, query, firestore} = require('firebase/firestore');


const firebaseConfig = {
  apiKey: "AIzaSyDmrL6uu488tGM-4ttKWIjcJ1mTHhqJhGU",
  authDomain: "blueocean-library.firebaseapp.com",
  projectId: "blueocean-library",
  storageBucket: "blueocean-library.appspot.com",
  messagingSenderId: "1099313837165",
  appId: "1:1099313837165:web:0f2ceec8e0d52496f33b64",
  measurementId: "G-P5NRSNHGEZ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();



const bookclubsRef = collection(db, "bookclubs");
getDocs(bookclubsRef)
.then(snapshot => {
  let bookclubs = []
  snapshot.docs.forEach((doc) => {
    bookclubs.push({...doc.data(), id: doc.id})
  })
  console.log(bookclubs)
})



module.exports = db;
