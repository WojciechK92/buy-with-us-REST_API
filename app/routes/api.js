const express = require('express');
const ItemController = require('../controllers/item-controller');
const UserController = require('../controllers/user-controller');
const authMiddleware = require('../middleware/auth-middleware');
const userController = require('../controllers/user-controller');

const route = new express.Router();

route.get('/items', ItemController.showItemList);
route.get('/items/:id', ItemController.showItem);
route.post('/items', authMiddleware, ItemController.addItem);
route.put('/items/:id', authMiddleware, ItemController.editItem);
route.delete('/items/:id', authMiddleware, ItemController.deleteItem);

route.post('/register', UserController.register);
route.post('/login', UserController.login);
route.post('/logout', authMiddleware, userController.logout);

route.post('/refresh-token', userController.refreshToken);

module.exports = route;