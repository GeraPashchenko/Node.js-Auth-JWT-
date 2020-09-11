const {connection} = require('../../mysqlConnection');

module.exports.fileDownload = (req, res) =>{
    let id = req.query.id || req.params.id;
    let file = connection.getRecord(process.env.FILES_TABLE_DB, id);

    if (file) {
        let fileExists = fs.existsSync(`${process.env.FILE_STORAGE_DIR}/${file.name}`);

        if (fileExists) {
            res.sendFile(`${process.env.FILE_STORAGE_DIR}/${file.name}`,{confine: false});
        }else{
            res.end('Ooops, this file is missed :(');
        }
    } else {
        res.end("There is no file with such id!");
    }
}