const User = require('../db/models/user');
const errorsHandler = require('../db/errorsHandler');

class UserController {
  login(req, res) {
    const body = req.body;

    try {
      // database connection
      res.status(200).json('Logged in');
    } catch(e) {
      console.log(e);
      // error message
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
};

module.exports = new UserController();