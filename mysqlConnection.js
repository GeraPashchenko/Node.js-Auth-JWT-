const mysql = require('sync-mysql');

module.exports.connection = new mysql({
    'host': 'localhost',
    'user': 'root',
    'password': 'password',
    'database': 'test'
});