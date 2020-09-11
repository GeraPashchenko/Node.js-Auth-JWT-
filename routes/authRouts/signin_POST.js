const {connection} = require('../../mysqlConnection');
const jwt = require('jsonwebtoken');

module.exports.signin = (req, res) => {
    let user = req.body;

    let userDB = connection.query(`SELECT * FROM ${process.env.USERS_TABLE_DB} WHERE id = ? AND password=?`,
        [ user.id, user.password]);

    if(!userDB.length){
        res.end("User doesn't exists!");
    }else {
        res.json({accessToken: userDB[0].token});
    }
}