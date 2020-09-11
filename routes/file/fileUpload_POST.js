const {connection} = require('../../mysqlConnection');
const multer = require('multer')
const {storage} = require('../../config/multerStorageConfig');

module.exports.fileUpload = (req, res) => {
    let authHeader = req.headers['authorization'];
    const upload = multer({storage: storage}).single(process.env.FILE_UPLOAD_INPUT);

    upload(req, res, (err) => {

        if (err) {
            console.log(err)
            return res.end("Error uploading file.");
        }

        let fileExt = req.file.originalname.split('.'); // get file extension from file name
        fileExt = fileExt[fileExt.length - 1];

        try{
            connection.query(`INSERT INTO ${process.env.FILES_TABLE_DB}(name, extension, mimetype, size) VALUES (?, ?, ?, ?)`,
                [req.file.filename, fileExt, req.file.mimetype, req.file.size]);

        }catch (e) {
            console.log(err);
            res.end("File upload error: "+ e);
        }

        res.end("File is uploaded");
    });
}