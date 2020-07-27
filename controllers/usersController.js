const usersRepository = require('../repositories/usersRepository');
const httpResponseFormatter = require('../formatters/httpResponse');

module.exports = {
    async getAll (req, res) {
        const users = await usersRepository.findAll();
        httpResponseFormatter.formatOkResponse(res, users);
    },
    async getById (req, res) {
        const oneUser = await usersRepository.findById(req.params.id);
        httpResponseFormatter.formatOkResponse(res, oneUser);
    },
    async create (req, res) {
        const newUser = await usersRepository.create(req.body);
        httpResponseFormatter.formatOkResponse(res, newUser);
    },
    async updateById  (req, res) {
        const isUpdateSuccessful = await usersRepository.updateById(req.params.id, req.body);
        httpResponseFormatter.formatOkResponse(res, {
            isUpdateSuccessful,
        });
    },
    async deleteById (req, res) {
        const isDeleteSuccessful = await usersRepository.deleteById(req.params.id);
        httpResponseFormatter.formatOkResponse(res, {
            isDeleteSuccessful,
        });
    }
};