const Models = require('./Models.js');

const getFirstReservations = (req, res) => {
  const id = parseInt(req.params.id);
  Models.getFirstReservations(id, (err, data) => {
    if (err) {
      console.log('big res error mayday x 2');
    } else {
      res.status(200).send(data.rows);
    }
  });
};

const getLocation = (req, res) => {
  const id = parseInt(req.params.id);

  Models.getLocation(id, (err, data) => {
    if (err) {
      console.log('big error mayday');
    } else {
      res.status(200).send(data.rows);
    }
  });
};

const addReservation = (req, res) => {
  Models.addReservation(req, (err, data) => {
    if (err) {
      console.log('big error posting new res mayday');
    } else {
      res.status(200);
    }
  });
};

const updateReservation = (req, res) => {
  Models.updateReservation(req, (err, data) => {
    if (err) {
      console.log('meh error updating reservation @ location');
    } else {
      res.status(200);
    }
  });
};

const deleteReservation = (req, res) => {
  Models.deleteReservation(req, (err, data) => {
    if (err) {
      console.log('beep error deleting reservation @ location');
    } else {
      res.status(200);
    }
  });
};

module.exports = {
  getFirstReservations,
  getLocation,
  addReservation,
  updateReservation,
  deleteReservation
};
