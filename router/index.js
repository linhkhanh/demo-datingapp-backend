const usersController = require('../controllers/usersController');
const messageController = require('../controllers/messageController');
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
    
    // get ALL CHAT ROOMS
    app.get('/chat_room', messageController.getAll);

    app.get('/:id', usersController.getById);

    //GET ONE CHAT ROOM
    app.get('/chat_room/:id_chat_room', messageController.getById);

    app.post('/', usersController.create);

    // log in with fb
    app.post('/get_data_fb', sessionController.getDataFacebook);
    app.post('/log_in_with_fb', sessionController.logInWithFacebookSubmit);

     // upload avata
     app.post('/avatar-upload', upload.single('file'), usersController.uploadAvatar);

    // create chat room
    app.post('/chat_room', messageController.createChatRoom);
    app.put('/:id', usersController.updateById);

    // add new message to a chat room 
    app.put('/chat_room/:id_chat_room', messageController.updateById);

    app.delete('/:id', usersController.deleteById);

   
    // login-submit
    app.post('/login_submit', sessionController.loginSubmit);

    // like another user
    app.put('/like/:id', usersController.likeUser);

};