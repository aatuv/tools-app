const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'training_schedule',
    multipleStatements: true
  });


  module.exports = connection;