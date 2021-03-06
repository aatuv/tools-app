const connection = require('../db');

// router.route(/schedule).get()
const fetchSchedule = (req, res) => {
    connection.query(
        `SELECT e.id AS id, d.weekday AS weekday, t.description AS type, n.name AS name, e.length AS length, e.content AS content
            FROM excercise e
            JOIN excercise_day d ON d.id = e.day_id
            JOIN excercise_name n ON n.id = e.name_id
            JOIN excercise_type t ON t.id = n.type_id`,
        (error, results) => {
            if (error) throw error
            else {
                res.status(200).json(results);
            }
        });
}

// router.route(/insertExcercise).post()
const insertExcercise = (req, res) => {
    connection.query(
        `INSERT INTO excercise (id, day_id, name_id, length, content)
            VALUES (?, 
            (SELECT id from excercise_day
            WHERE weekday = ?), 
            (SELECT id from excercise_name
            WHERE name = ?), 
            ?, ?)`, [req.body.id, req.body.weekday, req.body.name, req.body.length, req.body.content],
        (error, results, fields) => {
            if (error) throw error;
            else {
                res.status(200).json({ message: 'New excercise added' });
            }
        });
}
// router.route(/updateExcercise).post()
const updateExcercise = (req, res) => {
    connection.query(
        `UPDATE excercise
            SET day_id = 
                (SELECT id
                FROM excercise_day
                WHERE weekday = ?), 
                name_id = 
                (SELECT id
                FROM excercise_name
                WHERE name = ?), 
                length = ?, 
                content = ?
            WHERE id = ?`, [req.body.weekday, req.body.name, req.body.length, req.body.content, req.body.id],
        (error, results, fields) => {
            if (error) throw error;
            else {
                res.status(200).json({ message: 'Excercise updated' });
            }
        });
}
// router.route(/deleteExcercise).delete()
const deleteExcercise = (req, res) => {
    console.log(JSON.parse(req.query.id).id);
    connection.query(
        `DELETE FROM excercise
            WHERE id = ?`, [JSON.parse(req.query.id).id],
        (error, results, fields) => {
            if (error) throw error;
            else {
                res.status(200).json({ message: 'Excercise deleted succesfully' });
            }
        });
}
// router.route(/excerciseNames).get()
const fetchNames = (req, res) => {
    connection.query(
        `SELECT id, name, type_id
        FROM excercise_name`,
        (error, results) => {
            if (error) throw error
            else {
                res.status(200).json(results);
            }
        });
}
// router.route(/insertExcerciseWithNewName).post()
const insertExcerciseWithNewName = (req, res) => {
    let query1 = 
    `INSERT INTO excercise_name (id, type_id, name)
     VALUES (?, ?, ?)`;
    let query2 = 
    `INSERT INTO excercise (id, day_id, name_id, length, content)
     VALUES (?,
         (SELECT id from excercise_day
             WHERE weekday = ?),
         (SELECT id from excercise_name
             WHERE name = ?), 
        ?, ?)`;
    connection.query(query1 + ";" + query2, [req.body.name.id, req.body.name.type, req.body.name.name, req.body.form.id, req.body.form.weekday, req.body.form.name, req.body.form.length, req.body.form.content],
        (error, results, fields) => {
            if (error) throw error;
            else {
                res.status(200).json({ message: 'New excercise name added' });
            }
        });
}
// router.route(/deleteName).delete()
const deleteName = (req, res) => {
    connection.query(
        `DELETE FROM excercise_name
            WHERE id = ?`, [req.body.id],
        (error, results, fields) => {
            if (error) throw error;
            else {
                res.status(200).json({ message: 'Excercise name deleted succesfully' });
            }
        });
}

module.exports = { fetchSchedule, updateExcercise, insertExcercise, deleteExcercise, fetchNames, insertExcerciseWithNewName, deleteName };