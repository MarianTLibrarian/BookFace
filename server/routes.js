const router = require('express').Router();
const controller = require('./controllers');

// ---                     ---
// --- Books API endpoints ---
// ---                     ---
router.get('/search', controller.books.searchBooks);
router.get('/details', controller.books.bookDetails);
router.get('/books', controller.books.personalBooks);
router.get('/popularBooks', controller.books.popularBooks);

router.post('/books', controller.books.addBook);

router.put('/books/update', controller.books.updateBook);

// ---                          ---
// --- Book Clubs API endpoints ---
// ---                          ---
router.get('/bookclubs', controller.bookclubs.allClubs);
router.get('/myBookclubs', controller.bookclubs.myClubs);

router.post('/bookclub/create', controller.bookclubs.createClub);
router.post('/bookclubs/messages', controller.bookclubs.postMessage);

router.put('/bookclubs/join', controller.bookclubs.joinClub);

router.put('/bookclubs/leave', controller.bookclubs.deleteClub);



// ---                          ---
// --- Bookshelves API endpoints ---
// ---                          ---

router.get('/bookshelves', controller.bookshelves.allBookshelves);
router.post('/bookshelves/create', controller.bookshelves.addBookshelf);

module.exports = router;
