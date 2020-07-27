const usersController = require('../controllers/usersController');

module.exports = app => {
    app.get('/', usersController.getAll);
    app.get('/:id', usersController.getById);
    app.post('/', usersController.create);
    app.put('/:id', usersController.updateById);
    app.delete('/:id', usersController.deleteById);
};