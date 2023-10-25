const express = require('express');
const ItemController = require('../controllers/item-controller');
const UserController = require('../controllers/user-controller');
const authMiddleware = require('../middleware/auth-middleware');
const userController = require('../controllers/user-controller');
const checkCreatorMiddleware = require('../middleware/check-creator-middleware');

const route = new express.Router();

route.get('/items', ItemController.showItemList);
route.get('/items/:id', ItemController.showItem);
route.post('/items', authMiddleware, ItemController.addItem);
route.put('/items/:id', authMiddleware, checkCreatorMiddleware, ItemController.editItem);
route.delete('/items/:id', authMiddleware, checkCreatorMiddleware, ItemController.deleteItem);

route.post('/register', UserController.register);
route.post('/login', UserController.login);
route.post('/logout', authMiddleware, userController.logout);

route.post('/refresh-token', userController.refreshToken);

module.exports = route;