const models = require('../../db/models');

module.exports = {

  allClubs(req, res) {
    models.bookclubs.allClubs(req, (err, data) => {

      if(err) {
        console.log('controller error from allClubs: ', err);
        res.sendStatus(400);
      } else {
        res.status(200).send(data);
      }
    })
  },

  myClubs(req, res) {

    models.bookclubs.myClubs(req, (err, data) => {
      if(err) {
        console.log('controller error from myClubs: ', err);
        res.sendStatus(400);
      } else {
        res.status(200).send(data);
      }
    })
  },

  createClub(req, res) {

    models.bookclubs.createClub(req.body, (err) => {
      if(err) {
        console.log('controller error from createClub: ', err);
        res.sendStatus(400);
      } else {
        res.status(201).send("created");
      }
    })
  },

  postMessage(req, res) {
    models.bookclubs.postMessage(req.body, (err) => {
      if(err) {
        console.log('controller error from postMessage: ', err);
        res.sendStatus(400);
      } else {
        res.status(201).send("created");
      }
    })
  },

  joinClub(req, res) {
    models.bookclubs.joinClub(req.body, (err) => {
      if(err) {
        console.log('controller error from joinClub: ', err);
        res.sendStatus(400);
      } else {
        res.status(201).send("added");
      }
    })
  },

  deleteClub(req, res) {
    models.bookclubs.deleteClub(req.body, (err) => {
      if(err) {
        console.log('controller error from deleteClub: ', err);
        res.sendStatus(400);
      } else {
        res.status(204).send("deleted");
      }
    })
  },
};
