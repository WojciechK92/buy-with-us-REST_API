const jwt = require('jsonwebtoken');
const { jwtAccessKey } = require('../config');

module.exports = (payload) => {
  return jwt.sign(payload, jwtAccessKey, { expiresIn: '25s' });
};
