const controller = require('./controllers');
const router = require('express').Router();

// ---                     ---
// --- Books API endpoints ---
// ---                     ---
router.get('/search', controller.books.searchBooks);
router.get('/books', controller.books.personalBooks);
router.get('/popularBooks', controller.books.popularBooks);

router.post('/books', controller.books.addBook);

router.put('/books/status', controller.books.updateStatus);
router.put('/books/bookshelf', controller.books.addToBookshelf);
router.put('/books/review', controller.books.reviewBook);
router.put('/books/rating', controller.books.rateBook);

// ---                          ---
// --- Book Clubs API endpoints ---
// ---                          ---
router.get('/bookclubs', controller.bookclubs.allClubs);
router.get('/mybookclubs', controller.bookclubs.myClubs);

router.post('/bookclub/create', controller.bookclubs.createClub);
router.post('/bookclubs/messages', controller.bookclubs.postMessage);

router.put('/bookclubs/join', controller.bookclubs.joinClub);

module.exports = router;