const multer = require('multer')
const fs = require('fs');


module.exports.storage = multer.diskStorage({
    destination: function (req, file, callback) {

        //create dir if !exist
        if (!fs.existsSync(`${process.env.FILE_STORAGE_DIR}`)) {
            fs.mkdir(`./${process.env.FILE_STORAGE_DIR}`, (err)=>{
                if(err) {
                    console.log(err.stack)
                } else {
                    callback(null, `./${process.env.FILE_STORAGE_DIR}`);
                }
            })
        }else {
            callback(null, `./${process.env.FILE_STORAGE_DIR}`);
        }
    },
    filename: function (req, file, callback) {
        callback(null, `${Date.now()}.${file.originalname}`);
    }
});