const models = require('../../db/models');

module.exports = {
  allEvents(req, res) {
    models.events.allEvents(req, (err, data) => {
      if (err) {
        console.log('controller error from allEvents: ', err);
        res.sendStatus(400)
      } else {
        res.status(200).send(data);
      }
    })
  },
  addEvent(req, res) {
    models.events.addEvent(req.body, (err) => {
      if (err) {
        console.log('controller error from allBookshelves: ', err);
        res.sendStatus(400)
      } else {
        res.status(201).send('added');
      }
    })
  }
}