const usersController = require('../controllers/usersController');
const sessionController = require('../controllers/session');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

cloudinary.config({
    cloud_name: 'dt5rqi1l9',
    api_key: '552321872584896',
    api_secret: 'FC0feHoGttL0P8HFBDiZNWthplo'
});

module.exports = app => {
    app.get('/', usersController.getAll);
    app.get('/logout', sessionController.logOut);
    // check Authentication
    app.get('/check_authentication', sessionController.checkAuthentication);
    app.get('/:id', usersController.getById);
    app.post('/', usersController.create);
    app.put('/:id', usersController.updateById);
    app.delete('/:id', usersController.deleteById);

    // upload avata
    app.post('/avatar-upload', upload.single('file'), usersController.uploadAvatar);
    // login-submit
    app.post('/login_submit', sessionController.loginSubmit);
    
};