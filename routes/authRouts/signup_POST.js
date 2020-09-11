const {connection} = require('../../mysqlConnection');
const jwt_Auth = require('../../middleware/JWT_Auth');

module.exports.signup = (req, res) => {

    let user = req.body;
    let token = jwt_Auth.createToken(user);
    let refreshToken = jwt_Auth.createRefreshToken(user);

    let userDB = connection.query(`SELECT * FROM ${process.env.USERS_TABLE_DB} WHERE id = ? AND password = ?`,
        [user.id, user.password]);

    if(userDB.length){
        res.end("This user is already exists!");
    }else{
        connection.query(`INSERT INTO ${process.env.USERS_TABLE_DB}(id, password, token, refresh_token) VALUES (?,?,?,?)`,
            [user.id, user.password, token, refreshToken]);

        res.json({accessToken: token, refreshToken: refreshToken});
    }
}