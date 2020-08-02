const usersRepository = require('../repositories/usersRepository');
const httpResponseFormatter = require('../formatters/httpResponse');
const cloudinary = require('cloudinary').v2;
const bcrypt = require('bcrypt');

module.exports = {
    async getAll(req, res) {
        if (req.session.userId) {
            const users = await usersRepository.findAll();
            httpResponseFormatter.formatOkResponse(res, users);
        } else {
            httpResponseFormatter.formatOkResponse(res, {
                message: "User should log in to able to access to database"
            });
        }
    },
    async getById(req, res) {
        const oneUser = await usersRepository.findById(req.params.id);
        httpResponseFormatter.formatOkResponse(res, oneUser);
    },
    async create(req, res) {
        req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
        const newUser = await usersRepository.create(req.body);
        httpResponseFormatter.formatOkResponse(res, newUser);
    },
    async updateById(req, res) {
        const isUpdateSuccessful = await usersRepository.updateById(req.params.id, req.body);
        httpResponseFormatter.formatOkResponse(res, {
            isUpdateSuccessful,
        });
    },
    async deleteById(req, res) {
        const isDeleteSuccessful = await usersRepository.deleteById(req.params.id);
        httpResponseFormatter.formatOkResponse(res, {
            isDeleteSuccessful,
        });
    },
    async uploadAvatar(req, res, next) {
        try {
            let url = '';
            console.log(req);
            /// CLOUDINARY
            await cloudinary.uploader.upload(req.file.path,
                async function (error, result) {
                    url = result.url;
                }
            )
            httpResponseFormatter.formatOkResponse(res, {
                url,
            });
        } catch (error) {
            console.log(error);
        }

    }
};