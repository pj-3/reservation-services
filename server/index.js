require('newrelic');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const Controller = require('./Controller.js');

const app = express();
const port = 3000;

app.use(cors());
app.use('/', express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// get reservations
app.get('/location/:id/reservations', (req, res) => {
  Controller.getFirstReservations(req, res);
});

// get locations
app.get('/location/:id', (req, res) => {
  Controller.getLocation(req, res);
});

// post new reservation
app.post('/location/:id/reservations', (req, res) => {
  Controller.addReservation(req, res);
});

// update reservation
app.put('/location/:id/reservations/:id', (req, res) => {
  Controller.updateReservation(req, res);
});

// delete reservation
app.delete('/location/:id/reservations/:id', (req, res) => {
  Controller.deleteReservation(req, res);
});

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../client/dist/index.html'));
});

app.listen(port, () => console.log(`hello come in am listening @ ${port} high five`));
