const express = require('express');
const ItemController = require('../controllers/item-controller');

const route = new express.Router();

route.get('/items', ItemController.showItemList);

module.exports = route;