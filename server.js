const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const db = require('./db');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const cors = require('cors');
const { ObjectId } = require('mongodb');
const usersController = require('./controllers/usersController');


app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(session({ secret: 'randomsecret' })); // USE SESSION TO LOGIN/LOGOUT
app.use(cors({ origin: process.env.FRONT_END_URL || 'http://localhost:3000', credentials: true }));
app.use(express.urlencoded({ extended: false }));

require('./router')(app);

if (process.env.NODE_ENV !== 'test') {
    db.connect();
}

const server = app.listen(PORT, () => console.log(`Server started at port ${PORT}`));

// Socket IO

const io = require('socket.io')(server);
const users = [];
const connections = [];

io.on('connection', (socket) => {
    console.log('New client connected');
    // socket.on('press', () => {
    //     socket.emit('press', 'This message is from the server')
    // });
    socket.on('join', (data) => {
        console.log(data.id);
        socket.join(data.id);
        
    })
    socket.on('checkMatch', async (data) => {
        // Cmmect to Mongo and check
        // console.log(data);
        const response = await usersController.matchUser(data.currentUserId, data.likedUserId);
        // console.log(response);
        if (response.isUserLikedBack === true) {
            io.sockets.in(data.currentUserId).emit('matched', response);
            io.sockets.in(data.likedUserId).emit('matched', response);
        }
    })
    socket.on('disconnect', () => console.log("Client disconnected"));  
})

module.exports = app;