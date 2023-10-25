const User = require('../db/models/user');
const errorsHandler = require('../db/errorsHandler');
const jwt = require('jsonwebtoken');
const { jwtRefreshKey } = require('../config');
const Token = require('../db/models/token');
const generateAccessToken = require('../services/generateAccessToken');

class UserController {
  async login(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) throw new Error("User doesn't exist!")
      const validPassword = user.comparePassword(req.body.password);
      if (!validPassword) throw new Error('Invalid password!');

      // authrization based on jwt
      const payload = { id: user._id, email: user.email };
      const accessToken = generateAccessToken(payload); 
      const refreshToken = jwt.sign(payload, jwtRefreshKey);

      const token = new Token({ refreshToken });
      await token.save();

      const response = {
        id: user._id,
        email: user.email,
        accessToken,
        refreshToken,
      };
      res.status(200).json(response);
    } catch(e) {
      res.status(401).json({ errors: { message: 'Wrong email or password!' } });
    };
  };

  async register(req, res) {
    try {
      const user = new User({
        email: req.body.email,
        password: req.body.password,
      });

      await user.save();
      res.status(201).json(user);
    } catch(e) {
      const [status, errors] = errorsHandler(e);
      res.status(status).json(errors);
    };
  };

  async refreshToken(req, res) {
    const { token } = req.body;
    
    try {
      const refreshToken = await Token.findOne({ refreshToken: token })
      if (!refreshToken) throw new Error('Invalid token');

      jwt.verify(token, jwtRefreshKey, (err, data) => {
        if (err) throw new Error('Invalid token');

        const payload = { id: data.id, email: data.email };
        const accessToken = generateAccessToken(payload);
        
        const response = {
          id: data.id,
          email: data.email,
          accessToken,
          refreshToken: token,
        };
        res.status(200).json(response);
      });
    } catch(e) {
      res.status(422).json({ errors: { message: e.message } });
    };
  };

  async logout(req, res) {
    try {
      await Token.deleteOne({ refreshToken: req.body.token });
      res.sendStatus(204);
    } catch(e) {
      const [status, errors] = errorsHandler(e); 
      res.status(status).json(errors);
    };
  };
};

module.exports = new UserController();