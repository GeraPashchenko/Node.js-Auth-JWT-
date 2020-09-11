const multer = require('multer')
const {storage} = require('../../config/multerStorageConfig');
const fs = require('fs');
const {connection} = require('../../mysqlConnection');


module.exports.fileUpdate = (req, res) => {
    let id = req.params.id || req.query.id;
    const upload = multer({storage: storage}).single(process.env.FILE_UPLOAD_INPUT);

    upload(req, res, (err) => {

        let fileExt = req.file.originalname.split('.'); // get file extension from file name
        fileExt = fileExt[fileExt.length - 1];

        let file = connection.getRecord(process.env.FILES_TABLE_DB, id);

        if (err) {
            return res.end("Error uploading file.");
        }

        if (file) {
            let fileExists = fs.existsSync(`${process.env.FILE_STORAGE_DIR}/${file.name}`);

            if (fileExists) {
                fs.unlinkSync(`${process.env.FILE_STORAGE_DIR}/${file.name}`);
            }

            connection.query(`UPDATE ${process.env.FILES_TABLE_DB} SET name=?, extension=?, mimetype=?, size=? WHERE id = ?`,
                [req.file.filename, fileExt, req.file.mimetype, req.file.size, id]);

            res.end('File successfully updated!');
        } else {
            res.end("There is no file with such id!");
        }
    });
}