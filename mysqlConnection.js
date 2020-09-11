const mysql = require('sync-mysql');

module.exports.connection = new mysql({
    'host': process.env.MYSQL_HOST,
    'user': process.env.MYSQL_USER,
    'password': process.env.MYSQL_PASSWORD,
    'database': process.env.MYSQL_DB
});