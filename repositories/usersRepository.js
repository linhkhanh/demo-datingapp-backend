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
    }
};