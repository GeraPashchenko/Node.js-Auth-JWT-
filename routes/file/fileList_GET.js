const {connection} = require('../../mysqlConnection');

module.exports.filesList = (req, res) => {

    let listSize = req.query.listSize || req.params.listSize || 10;
    let page = req.query.page || req.params.listSize || 1;

    if(page == 0){
        page = 1;
    }

    let filesQuery = connection.query(`SELECT * FROM ${process.env.FILES_TABLE_DB} limit ?, ?`,
        [(page - 1) * listSize, listSize]);

    res.send(filesQuery)
}