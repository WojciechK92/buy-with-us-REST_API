const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { validateEmail, validatePassword } = require('../validators');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    unique: true,
    validate: [validateEmail, 'Invalid address email!'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    validate: [validatePassword, 'The password must contain minimum 6 characters - one uppercase letter and one special character ($, @, !, %, *, ?, &)'],
  },
});

userSchema.pre('save', function(next) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(this.password, salt);
  this.password = hash;

  next();
});

userSchema.methods = {
  comparePassword(password) {
    return bcrypt.compareSync(password, this.password);
  }, 
};

const User = mongoose.model('User', userSchema);

module.exports = User;