const express = require('express');
const ItemController = require('../controllers/item-controller');
const UserController = require('../controllers/user-controller');

const route = new express.Router();

route.get('/items', ItemController.showItemList);
route.get('/items/:id', ItemController.showItem);
route.post('/items', ItemController.addItem);
route.put('/items/:id', ItemController.editItem);
route.delete('/items/:id', ItemController.deleteItem);

route.post('/login', UserController.login);

module.exports = route;