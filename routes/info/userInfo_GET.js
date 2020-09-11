const {connection} = require('../../mysqlConnection');

module.exports.userInfo = (req, res) =>{
    let user = req.user;

    if(user){
        res.send({id: user.id, password: user.password});
    }else{
        res.send("There is no user with such token!");
    }
}