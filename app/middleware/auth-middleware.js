const jwt = require('jsonwebtoken');
const { jwtAccessKey } = require('../config');

module.exports = (req, res, next) => {
  const accessToken = req.headers.authorization?.split(' ')[1];

  try {
    if (!accessToken) throw new Error('Unauthorized!');
    jwt.verify(accessToken, jwtAccessKey, (err, data) => {
      if (err) throw new Error('Unauthorized!');
    });

    next();
  } catch(e) {
    res.status(401).json({ errors: { message: e.message } }); 
  };
};