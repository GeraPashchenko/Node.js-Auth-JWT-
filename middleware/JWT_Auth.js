const jwt = require('jsonwebtoken');
const {connection} = require('../mysqlConnection');


module.exports.createToken = (user) => {
    return jwt.sign(user, process.env.SECRET_TOKEN);
}

module.exports.createRefreshToken = (user) => {
    return jwt.sign(user, process.env.SECRET_TOKEN_REFRESH);
}

module.exports.authenticateToken = (req, res, next) => {
    let authHeader = req.headers['authorization'];
    let token = authHeader.split(' ')[1];
    let user = {};
    let BlockedToken = connection.query(`SELECT token FROM ${process.env.BLOCKED_TOKENS_DB} WHERE token=?`, [token]);

    if (token == null) return res.sendStatus(401);

    if (BlockedToken.length) {
        res.send("Token is invalid!");
    } else {
        try {
            user = jwt.verify(token, process.env.SECRET_TOKEN)
            req.user = user;
            next();

        } catch (e) {

            if (e instanceof jwt.TokenExpiredError) {

                let user = jwt.decode(token);
                let newToken = jwt.sign({id: user.id, password: user.password}, process.env.SECRET_TOKEN);

                connection.query(`UPDATE ${process.env.USERS_TABLE_DB} SET token=? WHERE id=? AND password=?`,
                    [newToken, user.id, user.password]);

                req.headers['authorization'] = 'Bearer ' + newToken;
                req.user = {id: user.id, password: user.password};
                next();
            } else if (e instanceof jwt.JsonWebTokenError) {
                res.send("Token is invalid!");
            }
        }
    }
}