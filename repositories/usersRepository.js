const db = require('../db');
const { ObjectId } = require('mongodb');

const doFindMany = async condition => {
   const data = await db.users.find(condition).toArray()
   return data
};

module.exports = {
    async create (data) {
        if (!('isCompleted' in data)) data.isCompleted = false;
        const { ops: [newOne] } = await db.users.insertOne(data);
        return newOne;
    },
    async updateById (id, newData) {
        const { result } = await db.users.updateOne(
            { _id: ObjectId(id) },
            { $set: newData }
        );
        return !!result.nModified;
    },
    async findById (id) {
        const [result] = await doFindMany({ _id: ObjectId(id) });
        return result;
    },
    async getOneByEmail (email) {
        const [result] = await doFindMany({email: email});
        if (!result) throw new Error(`User with email '${email}' does not exist`);
        return result;
    },
    findAll () {
        return doFindMany({});
    },
    async deleteById (id) {
        const { result } = await db.users.deleteOne({
            _id: ObjectId(id),
        });
        return !!result.n;
    },
    async likeUser (currentUserId, likedUser) {
        const result = await db.users.findOneAndUpdate(
            { _id: ObjectId(currentUserId) },
            { $addToSet: { likes: likedUser._id }},
            { returnNewDocument: true }
            );
        // if (!result) {
        //     console.log('waiting for result');
        //     await result;
        // } else {
        //     // Do Matching

        //     const likedUsers = await db.users.findOne(
        //         { _id: ObjectId(currentUserId) },
        //         { projection: {_id:0, likes:1}}
        //         );
        //     let likedUsersArray = likedUsers.likes;
        //     const matchResult = await this.findMatch(currentUserId, likedUsersArray);

        // }
        return result;
        
    },
    async findMatch(currentUserId, likedUser) {
        // console.log(`liked user is` + likedUser)
        let likedUserObjectId = ObjectId(likedUser);
        let isUserLikedBack = false;
        const result = await db.users.findOne(
            { _id: likedUserObjectId },
            { projection: { likes: 1, userName: 1, image: 1}}
        );
        // console.log(result.likes);
        result.likes.forEach((user) => {
            if (user === currentUserId) {
                isUserLikedBack = true;
            }
        });
        // console.log(isUserLikedBack);
        console.log(result)
        return { 
            userName: result.userName,
            _id: result._id,
            image: result.image,
            isUserLikedBack }
    }
};