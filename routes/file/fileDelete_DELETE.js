const {connection} = require('../../mysqlConnection');
const fs = require('fs');

module.exports.fileDelete = (req, res) =>{

    let id = req.params.id || req.query.id;
    let fileDB = connection.getRecord(process.env.FILES_TABLE_DB, id);

    if(fileDB){
        let fileExists = fs.existsSync(`${process.env.FILE_STORAGE_DIR}/${fileDB.name}`);

        if(fileExists){
            connection.query(`DELETE FROM ${process.env.FILES_TABLE_DB} WHERE id = ?`, [id]);
            fs.unlinkSync(`${process.env.FILE_STORAGE_DIR}/${fileDB.name}`);
            res.end('File successfully deleted!');

        }else if(!fileExists){
            connection.query(`DELETE FROM ${process.env.FILES_TABLE_DB} WHERE id = ?`, [id]);
            res.end('File successfully deleted!');
        }

    }else if(!fileDB){
        res.end('There is no file with such id!');
    }

}