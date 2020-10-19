const mysql = require('mysql');
const { connect } = require('../app');
const dbConfig = require('../config/db.config');

const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

connection.connect(error => {
    if (error) throw error;
    console.log('Connecté a mysql avec l \'id '  + connection.threadId);
});

module.exports = connection;