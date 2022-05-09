const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');
const { firebaseConfig } = require('./exampleConfig')


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


module.exports = db;
