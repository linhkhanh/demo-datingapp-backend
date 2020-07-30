const { MongoClient } = require('mongodb');

const DB_NAME = process.env.DB_NAME || 'merncrud';;
const COLLECTION_NAME = 'users';
const MONGO_URL = process.env.MONGO_URI || 'mongodb://localhost:27017';

const client = new MongoClient(MONGO_URL, { useUnifiedTopology: true });
const userSchema = require('./userSchema');
module.exports = {
    async connect () {
        const connection = await client.connect();
        console.log('Connected to Mongo');
        const db = connection.db(DB_NAME);
        await db.createCollection(COLLECTION_NAME, userSchema);
        db.collection(COLLECTION_NAME).createIndex({"email": 1}, {unique: true});
        this[COLLECTION_NAME] = db.collection(COLLECTION_NAME);
    },
    disconnect () {
        return client.close();
    },
};
