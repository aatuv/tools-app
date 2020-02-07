const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const trainingSchedule = require('./routes/trainingSchedule');

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', trainingSchedule);

// catch 404
app.use((req, res) => {
    return res.status(404).send({ message: `Requested route ${req.url} was not found`});
});

// catch 500
app.use((req, res) => {
    return res.status(500).send({ message: `Internal server error`});
});

module.exports = app;