const {connection} = require('../../mysqlConnection');
const jwt_Auth = require('../../middleware/JWT_Auth');

module.exports.logout = (req, res) =>{
    let authHeader = req.headers['authorization'];
    let token = authHeader.split(' ')[1];
    let user = req.user;
    let newToken = jwt_Auth.createRefreshToken(user);

    connection.query(`INSERT INTO ${process.env.BLOCKED_TOKENS_DB}(token) VALUES (?)`,
        [token]);

    connection.query(`UPDATE ${process.env.USERS_TABLE_DB} SET token=? WHERE id=? AND password=?`,
        [newToken, user.id, user.password]);

    res.json({accessToken: newToken});
}