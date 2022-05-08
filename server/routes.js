const controller = require('./controllers');
const router = require('express').Router();

// ---                     ---
// --- Books API endpoints ---
// ---                     ---
router.get('/search', controller.books.searchBooks);
router.get('/books', controller.books.personalBooks); // FIXME: conflict with react-router endpoint
router.get('/popularBooks', controller.books.popularBooks);

router.post('/books', controller.books.addBook); // FIXME: conflict with react-router endpoint

// FIXME: These need unique endpoints
router.put('/books', controller.books.updateStatus);
router.put('/books', controller.books.addToBookshelf);
router.put('/books', controller.books.reviewBook);
router.put('/books', controller.books.rateBook);

// ---                          ---
// --- Book Clubs API endpoints ---
// ---                          ---
router.get('/bookclubs', controller.bookclubs.allClubs);
router.get('/mybookclubs', controller.bookclubs.myClubs);

router.post('/bookclub', controller.bookclubs.createClub);
router.post('/FIXME', controller.bookclubs.postMessage); // FIXME: API endpoint not yet defined

router.put('/FIXME', controller.bookclubs.joinClub); // FIXME: API endpoint not yet defined

module.exports = router;
