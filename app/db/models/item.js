const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { validateString, validateCategory } = require('../validators');

const itemSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Name is required'],
    validate: [validateString, 'Only alphabet characters and numbers (0-10) are available!'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    validate: [validateCategory, 'Wrong category!'],
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [1, 'Minimum value: 1!'],
    max: [1000, 'Maximum value: 1000!'],
  },
  description: {
    type: String,
    trim: true,
    required: [true, 'Description is required'],
    validate: [validateString, 'Only alphabet characters and numbers (0-10) are available!'],
  },
  // user: {
  //   type: mongoose.Types.ObjectId,
  //   required: [true, 'User is required'],
  //   ref: 'User',
  // },
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;

