const express = require('express');
const ItemController = require('../controllers/item-controller');

const route = new express.Router();

route.get('/items', ItemController.showItemList);
route.get('/items/:id', ItemController.showItem);

module.exports = route;