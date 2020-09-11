const {connection} = require('../../mysqlConnection');
const jwt_Auth = require('../../middleware/JWT_Auth');
const jwt = require('jsonwebtoken');

module.exports.renewToken = (req, res) =>{

    let refreshToken = req.body.refreshToken;

    jwt.verify(refreshToken, process.env.SECRET_TOKEN_REFRESH, (err, user) => {
        if (err) return res.sendStatus(403);

        let newToken = jwt.sign({id: user.id, password: user.password}, process.env.SECRET_TOKEN, {expiresIn: process.env.AccessTokenExpiryTime});;

        connection.query(`UPDATE ${process.env.USERS_TABLE_DB} SET token=? WHERE id = ? AND password=?`,
            [newToken, user.id, user.password]);

        res.json({accessToken: newToken, refreshToken: refreshToken});
    });
}