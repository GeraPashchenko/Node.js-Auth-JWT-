const {connection} = require('../../mysqlConnection');

module.exports.fileInfo = (req, res) =>{
    let id = req.params.id || req.query.id;

    let file = connection.getRecord(process.env.FILES_TABLE_DB, id);

    if(file){
        res.send(file);
    }else{
        res.send("There is no file with such id!");
    }
}