const models = require('../../db/models');

module.exports = {
  async searchBooks(req, res) {
    const books = await models.books.searchBooks(req.query);

    res.status(200).send(books);
  },

  personalBooks() {},

  popularBooks(req, res) {
    models.books.popularBooks(req, (err, data) => {
      if (err) {
        console.log('controller error from popularBooks:', err);
        res.sendStatus(400);
      } else {
        const fictionBooks = [];
        const nonfictionBooks = [];
        data[0].books.forEach((item) => {
          const book = {
            isbn13: item.primary_isbn13,
            author: item.author,
            book_image: item.book_image,
            title: item.title,
            description: item.description,
            rank: item.rank,
          };
          fictionBooks.push(book);
        });
        data[1].books.forEach((item) => {
          const book = {
            isbn13: item.primary_isbn13,
            author: item.author,
            book_image: item.book_image,
            title: item.title,
            description: item.description,
            rank: item.rank,
          };
          nonfictionBooks.push(book);
        });

        const popularBooks = {
          lists: [
            {
              list_name: data[0].list_name,
              books: fictionBooks,
            },
            {
              list_name: data[1].list_name,
              books: nonfictionBooks,
            },
          ],
        };
        res.status(200).send(popularBooks);
      }
    });
  },

  addBook() {},

  updateStatus() {},

  addToBookshelf() {},

  reviewBook() {},

  rateBook() {},
};
