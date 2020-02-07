const connection = require('../db');

const fetchSchedule = (req, res) => {
    connection.query('SELECT * FROM schedule', (error, results, fields) => {
        if (error) throw error;
        else {
            res.status(200).json(results.data);
        }
    });
}

const updateSchedule = (req, res) => {
    connection.query('UPDATE schedule SET ', (error, results, fields) => {
        if (error) throw error;
        else {
            res.status(200).json({ message: 'Training schedule updated' });
        }
    });
}

module.exports = { fetchSchedule, updateSchedule };