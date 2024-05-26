const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Rfyfky11*',
    database: 'db-theme-3'
});

module.exports = db;
