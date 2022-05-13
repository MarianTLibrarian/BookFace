const router = require('express').Router();
const routeCache = require('route-cache');
const controller = require('./controllers');

const config = require('./twilioConfig');
const { videoToken } = require('./tokens');

// ---                          ---
// --- Video API endpoints      ---
// ---                          ---

const sendTokenResponse = (token, res) => {
  res.set('Content-Type', 'application/json');
  res.send(
    JSON.stringify({
      token: token.toJwt()
    })
  );
};

router.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

router.get('/video/token', (req, res) => {
  const {identity} = req.query;
  const {room} = req.query;
  const token = videoToken(identity, room, config);
  console.log('GET USER IDENTITY', token)
  sendTokenResponse(token, res);
});

router.post('/video/token', (req, res) => {
  console.log('SERVER: ', req.body)
  const {identity} = req.body;
  const {room} = req.body;
  const token = videoToken(identity, room, config);
  sendTokenResponse(token, res);
});

// ---                     ---
// --- Books API endpoints ---
// ---                     ---

router.get('/search', routeCache.cacheSeconds(3600), controller.books.searchBooks);
router.get('/details', routeCache.cacheSeconds(3600), controller.books.bookDetails);
router.get('/books', controller.books.personalBooks);
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

router.get('/bookshelves', controller.bookshelves.allBookshelves);
router.post('/bookshelves/create', controller.bookshelves.addBookshelf);

// ---                               ---
// --- Bookclub events API endpoints ---
// ---                               ---
router.get('/events', controller.events.allEvents);
router.post('/events/create', controller.events.addEvent);

module.exports = router;
