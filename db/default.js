const { MongoClient } = require('mongodb');

const DB_NAME = process.env.DB_NAME || 'merncrud';;
const COLLECTION_NAME = 'users';
const COLLECTIONS = {
	USERS: 'users',
	CHATROOM: "chat_room"
};
const MONGO_URL = process.env.MONGO_URI || 'mongodb://localhost:27017';

const client = new MongoClient(MONGO_URL, { useUnifiedTopology: true });
const userSchema = require('./userSchema');
module.exports = {
    async connect () {
        const connection = await client.connect();
        console.log('Connected to Mongo');
        const db = connection.db(DB_NAME);
       
        await db.createCollection(COLLECTIONS.USERS, userSchema);
        await db.createCollection(COLLECTIONS.CHATROOM);
        
        db.collection(COLLECTIONS.USERS).createIndex({"email": 1}, {unique: true});
        
        this.users = db.collection(COLLECTIONS.USERS);
		this.chat_room = db.collection(COLLECTIONS.CHATROOM)
    },
    disconnect () {
        return client.close();
    },
};
