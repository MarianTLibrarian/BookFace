const router = require('express').Router();
const routeCache = require('route-cache');
const controller = require('./controllers');

// ---                     ---
// --- Books API endpoints ---
// ---                     ---
router.get('/search', routeCache.cacheSeconds(3600), controller.books.searchBooks);
router.get('/details', routeCache.cacheSeconds(3600), controller.books.bookDetails);
router.get('/books', routeCache.cacheSeconds(3600), controller.books.personalBooks);
router.get('/popularBooks', routeCache.cacheSeconds(3600), controller.books.popularBooks);

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

// ---                           ---
// --- Bookshelves API endpoints ---
// ---                           ---

router.get('/bookshelves', routeCache.cacheSeconds(3600), controller.bookshelves.allBookshelves);
router.post('/bookshelves/create', controller.bookshelves.addBookshelf);

// ---                               ---
// --- Bookclub events API endpoints ---
// ---                               ---
router.get('/events', controller.events.allEvents);
router.post('/events/create', controller.events.addEvent);

module.exports = router;
