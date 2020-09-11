const express = require('express');
const router = express.Router();
const jwt_Auth = require('../middleware/JWT_Auth');

//rout handlers
const {logout} = require('./authRouts/logout_GET');
const {renewToken} = require('./authRouts/renewToken_POST');
const {signin} = require('./authRouts/signin_POST');
const {signup} = require('./authRouts/signup_POST');
const {fileDelete} = require('./file/fileDelete_DELETE');
const {fileDownload} = require('./file/fileDownload_GET');
const {fileInfo} = require('./file/fileInfo_GET');
const {filesList} = require('./file/fileList_GET');
const {fileUpdate} = require('./file/fileUpdate_PUT');
const {fileUpload} = require('./file/fileUpload_POST');
const {userInfo} = require('./info/userInfo_GET');

// routs
router.post('/signin', signin);
router.post('/signin/new_token', renewToken);
router.post('/signup', signup);
router.get('/logout', jwt_Auth.authenticateToken, logout);
router.get('/info', jwt_Auth.authenticateToken, userInfo);

router.post('/file/upload', jwt_Auth.authenticateToken, fileUpload);
router.get('/file/list', jwt_Auth.authenticateToken, filesList);
router.delete('/file/delete/:id', jwt_Auth.authenticateToken, fileDelete);
router.get('/file/download/:id', jwt_Auth.authenticateToken, fileDownload);
router.get('/file/:id', jwt_Auth.authenticateToken, fileInfo);
router.put('/file/update/:id', jwt_Auth.authenticateToken, fileUpdate);


module.exports = router;