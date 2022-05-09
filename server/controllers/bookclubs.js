const models = require('../../db/models');

module.exports = {

  allClubs(req, res) {
    models.bookclubs.allClubs(req, (err, data) => {
      if(err) {
        console.log('controller error from allClubs: ', err);
        res.status(400);
      } else {
        res.status(200).send(data);
      }
    })
  },

  myClubs() {},

  createClub() {},

  postMessage() {},

  joinClub() {},

  deleteClub() {},
};
