const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const trainingSchedule = require('./routes/trainingSchedule');

const app = express();

app.use(cors(
    {
    origin: "http://localhost:3000",
    methods: "GET,POST,DELETE"
}
));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// route to /routes/trainingSchedule.js
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