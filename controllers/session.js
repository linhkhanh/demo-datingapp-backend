const usersRepository = require('../repositories/usersRepository');
const httpResponseFormatter = require('../formatters/httpResponse');
const bcrypt = require('bcrypt');

// EXPORT
module.exports = {
    async loginSubmit(req, res) {
        try {
            const user = await usersRepository.getOneByEmail(req.body.email);
            if (bcrypt.compareSync(req.body.password, user.password)) {
                req.session.userId = user._id;
                httpResponseFormatter.formatOkResponse(res, user);
            } else {
                httpResponseFormatter.formatOkResponse(res, {
                    err: "password is wrong"
                });
            }
        } catch (err) {
            console.log(err);
            httpResponseFormatter.formatOkResponse(res, {
                err: err.message
            });
        }
    },
    logOut: (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                return console.log(err);
            }
            httpResponseFormatter.formatOkResponse(res, {
                user: "log out"
            });
        })
    },
    checkAuthentication (req, res) {
        req.session.userId ? httpResponseFormatter.formatOkResponse(res, {
            isLogIn: true
        }) : httpResponseFormatter.formatOkResponse(res, {
            isLogIn: false
        });
    }
}