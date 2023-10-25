const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenSchema = new Schema({ refreshToken: String });
const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;