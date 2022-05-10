const models = require('../../db/models');

module.exports = {
  async searchBooks(req, res) {
    try {
      const books = await models.books.searchBooks(req.query.q);
      res.status(200).send(books);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  },

  async bookDetails(req, res) {
    try {
      const details = await models.books.bookDetails(req.query.q);
      res.status(200).send(details);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  },

  personalBooks(req, res) {
    models.books.personalBooks(req, (err, results)=>{
      if (err) {
        console.log('Unable to get all personal Books');
        res.sendStatus(500);
      } else {
        res.status(201).send(results);
      }
    })

  },

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

  addBook(req, res) {
    models.books.addBook(req, (err, results)=>{
      if (err) {
        console.log('Unable to add book to personal library');
        res.sendStatus(500);
      } else {
        res.status(201).send(results);
      }
    })
  },

  updateBook(req, res) {
    models.books.updateBook(req, (err, results)=>{
      if (err) {
        console.log('Unable to update rating');
        res.sendStatus(500);
      } else {
        res.status(201).send(results);
      }
    })
  },
};
