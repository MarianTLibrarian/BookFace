const models = require('../../db/models');

module.exports = {
  allBookshelves(req, res) {
    models.bookshelves.allBookshelves(req, (err, data) => {
      if (err) {
        console.log('controller error from allBookshelves: ', err);
        res.sendStatus(400)
      } else {
        res.status(200).send(data);
      }
    })
  },
  addBookshelf(req, res) {
    models.bookshelves.addBookshelf(req.body, (err) => {
      if (err) {
        console.log('controller error from allBookshelves: ', err);
        res.sendStatus(400)
      } else {
        res.status(201).send('added');
      }
    })
  }
}